const stripe = require('stripe')('sk_test_RC4yKzAplOVpJikiw6GJm2F900eNjJHZ2w');
const planModel = require('../model/planModel');
const getCheckout = async (req, res) => {
    let id = req.params['id'];
    const plan = await planModel.findById(id);
    console.log(plan);
    {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                name: `${plan.name}`,
                description: `${plan.description}`,
                images: ['https://example.com/t-shirt.png'],
                amount: `${plan.price}`,
                currency: 'usd',
                quantity: 1,
            }],
            success_url: 'http://localhost:3000',
            cancel_url: 'http://localhost:3000/plans',
        });
        console.log(session)
        res.status(201).json({
            session
        })
    }


}
module.exports = { getCheckout };