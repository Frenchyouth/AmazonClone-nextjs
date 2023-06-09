const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
    const { items, email } = req.body;

    const transformationItems = items.map((item) => ({
        
        quantity: 1,
        price_data: {
            currency: "usd",
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image],
                description: item.description,
            },
        },
    }));

    //we have to transform our data to strripe documentation for it to be readable by stripe
    // console.log(items);
    // console.log(email);
    const session = await stripe.checkout.sessions.create({
        // payment_method_types: ["card"],
        // shipping_rates: ['shr_1MjUMmHq4c5bfUcODsm9s9yw'],
        shipping_address_collection: {
            allowed_countries: ['US', 'GB', 'CA'],
        },
        line_items: transformationItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image)),
        },
    });

    res.status(200).json({id: session.id});
};