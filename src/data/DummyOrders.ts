export const orders = [
    {
        orderID: "ORD-001",
        customerName: "John Doe",
        paymentMethod: "Credit Card",
        courier: "UPS",
        address: "123 Main St, City",
        contactNumber: "+1 123-456-7890",
        status: "Pending",
        price: 50.99,
        items: [
            {
                productCode: "PROD-001",
                productName: "Widget A",
                desc: "A high-quality widget for various purposes.",
                image: {
                    id: "IMG-001",
                    url: "https://example.com/images/widget-a.jpg"
                },
                variants: [
                    {
                        name: "Color",
                        value: "Blue"
                    },
                    {
                        name: "Size",
                        value: "Medium"
                    }
                ]
            }
        ]
    },
    {
        orderID: "ORD-002",
        customerName: "Jane Smith",
        paymentMethod: "PayPal",
        courier: "FedEx",
        address: "456 Elm St, Town",
        contactNumber: "+1 987-654-3210",
        status: "Shipped",
        price: 79.99,
        items: [
            {
                productCode: "PROD-002",
                productName: "Gadget B",
                desc: "A versatile gadget with advanced features.",
                image: {
                    id: "IMG-002",
                    url: "https://example.com/images/gadget-b.jpg"
                },
                variants: [
                    {
                        name: "Color",
                        value: "Black"
                    },
                    {
                        name: "Size",
                        value: "Large"
                    }
                ]
            }
        ]
    },
    {
        orderID: "ORD-003",
        customerName: "Donald Trump",
        paymentMethod: "Cash On Delivery",
        courier: "NelEx",
        address: "456 Elm St, Town",
        contactNumber: "+1 987-654-3210",
        status: "Packed",
        price: 79.99,
        items: [
            {
                productCode: "PROD-003",
                productName: "Gadget C",
                desc: "A versatile gadget with advanced features.",
                image: {
                    id: "IMG-002",
                    url: "https://example.com/images/gadget-b.jpg"
                },
                variants: [
                    {
                        name: "Color",
                        value: "Black"
                    },
                    {
                        name: "Size",
                        value: "Large"
                    }
                ]
            },
            {
                productCode: "PROD-001",
                productName: "Widget A",
                desc: "A high-quality widget for various purposes.",
                image: {
                    id: "IMG-001",
                    url: "https://example.com/images/widget-a.jpg"
                },
                variants: [
                    {
                        name: "Color",
                        value: "Blue"
                    },
                    {
                        name: "Size",
                        value: "Medium"
                    }
                ]
            }
        ]
    },

];

