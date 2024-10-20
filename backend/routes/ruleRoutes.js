const express = require('express');
const Rule = require('../models/Rule');
const router = express.Router();

// Create a rule
router.post('/create_rule', async (req, res) => {
    const { ruleString } = req.body;

    try {
        const ast = create_rule(ruleString);
        const newRule = new Rule({ ruleString });
        await newRule.save();
        res.json({ message: 'Rule created successfully', rule: newRule });
    } catch (error) {
        res.status(400).json({ message: 'Invalid rule string', error });
    }
});

// Combine rules
router.post('/combine_rules', async (req, res) => {
    const { ruleStrings } = req.body;
    console.log('Received rules to combine:', ruleStrings);  // Log received data

    try {
        // Combine logic
    } catch (error) {
        console.error('Error combining rules:', error);  // Log the actual error
        res.status(400).json({ error: 'Error combining rules' });
    }
});


// Evaluate rules
router.post('/evaluate', (req, res) => {
    const { ast, data } = req.body;

    try {
        const result = evaluate_rule(ast, data);
        res.json({ eligible: result });
    } catch (error) {
        res.status(400).json({ message: 'Invalid data or AST', error });
    }
});

// Modify rule
router.put('/modify_rule/:id', async (req, res) => {
    const { ruleString } = req.body;

    try {
        const ast = create_rule(ruleString);
        const updatedRule = await Rule.findByIdAndUpdate(req.params.id, { ruleString }, { new: true });
        res.json({ message: 'Rule modified successfully', rule: updatedRule });
    } catch (error) {
        res.status(400).json({ message: 'Invalid rule string or rule ID', error });
    }
});

// Helper function to create the AST from a rule string
const create_rule = (rule_string) => {
    const tokens = rule_string.match(/\w+|\(|\)|>|<|=|'[^']*'|AND|OR/g);
    let index = 0;

    function parseExpression() {
        let node = parseTerm();
        while (tokens[index] === 'AND' || tokens[index] === 'OR') {
            const operator = tokens[index];
            index++;
            const right = parseTerm();
            node = { type: 'operator', value: operator, left: node, right };
        }
        return node;
    }

    function parseTerm() {
        if (tokens[index] === '(') {
            index++;
            const node = parseExpression();
            index++; // Skipping closing parenthesis
            return node;
        }
        const operand = tokens.slice(index, index + 3).join(' ');
        index += 3;
        return { type: 'operand', value: operand };
    }

    return parseExpression();
};

// Function to combine multiple ASTs into one
const combine_rules = (rules) => {
    if (rules.length === 0) return null;
    if (rules.length === 1) return create_rule(rules[0]);

    let combinedAST = create_rule(rules[0]);
    for (let i = 1; i < rules.length; i++) {
        combinedAST = {
            type: 'operator',
            value: 'AND', // You can choose 'OR' based on your logic
            left: combinedAST,
            right: create_rule(rules[i])
        };
    }
    return combinedAST;
};

// Function to evaluate the AST against data
const evaluate_rule = (astNode, data) => {
    if (!astNode) return false;
    switch (astNode.type) {
        case "operator":
            const leftEval = evaluate_rule(astNode.left, data);
            const rightEval = evaluate_rule(astNode.right, data);
            if (astNode.value === "AND") return leftEval && rightEval;
            if (astNode.value === "OR") return leftEval || rightEval;
            break;
        case "operand":
            const [key, operator, operand] = astNode.value.split(" ");
            const dataValue = data[key];
            switch (operator) {
                case ">": return dataValue > Number(operand);
                case "<": return dataValue < Number(operand);
                case "=": return dataValue === operand.replace(/'/g, "");
                default: return false;
            }
    }
    return false;
};

module.exports = router;
