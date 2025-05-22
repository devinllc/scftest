const express = require('express');
const walletModel = require('../model/walletModel');
const router = express.Router();


router.get('/balance', (req, res) => {
    const { userId } = req.query;  // ✅ Works in GET requests

    walletModel.findOne({ userId })
        .then((wallet) => {
            if (!wallet) {
                return res.status(404).json({ message: 'Wallet not found' });
            }
            res.status(200).json({ balance: wallet.balance, wallet });
        })
        .catch((error) => {
            console.error('Error fetching wallet balance:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
});

router.post('/addmoney', async (req, res) => {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
        return res.status(400).json({ message: 'User ID and amount are required' });
    }

    try {
        const wallet = await walletModel.findOne({ userId });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        wallet.balance += amount;
        await wallet.save();

        res.status(200).json({ message: 'Money added successfully', balance: wallet.balance });
    } catch (error) {
        console.error('Error adding money to wallet:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/sendmoney', async (req, res) => {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
        return res.status(400).json({ message: 'User ID and amount are required' });
    }

    try {
        const wallet = await walletModel.findOne({ userId });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        if (wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        wallet.balance -= amount;
        await wallet.save();

        res.status(200).json({ message: 'Money sent successfully', balance: wallet.balance });
    } catch (error) {
        console.error('Error sending money from wallet:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/addpendingmoney', async (req, res) => {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
        return res.status(400).json({ message: 'User ID and amount are required' });
    }

    try {
        const wallet = await walletModel.findOne({ userId });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        wallet.pendingbalance += amount;
        await wallet.save();

        res.status(200).json({ message: 'Pending money added successfully', pendingbalance: wallet.pendingbalance });
    } catch (error) {
        console.error('Error adding pending money to wallet:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;