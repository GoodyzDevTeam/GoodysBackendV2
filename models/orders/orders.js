const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const orders = {
	merchantId: {
		type: Schema.Types.ObjectId
	},
	customerId: {
		type: Schema.Types.ObjectId
	},
	anonymous: {
		address: {
			type: Schema.Types.String,
		},
		email: {
			type: Schema.Types.String,
		},
		firstName: {
			type: Schema.Types.String,
		},
		lastName: {
			type: Schema.Types.String,
		},
		phone: {
			type: Schema.Types.String,
		}
	},
	dispensary: {
		type: Schema.Types.ObjectId
	},
	products: [{
		productId: {
			type: Schema.Types.ObjectId
		},
		wpq: {
			type: Schema.Types.Array
		},
		subTotal: {
			type: Schema.Types.Number
		}
	}],
	discounted: {
		type: Schema.Types.Number
	},
	requestedTime: {
		type: Date
	},
	orderType: {
		type: String
	},
	completedTime: {
		type: String
	},
	status: {
		type: String
	},
	license: [{
		type: Schema.Types.String,
	}]
};

const ordersSchema = new Schema(orders);

ordersSchema.pre('save', next => {
	let ts = Math.round((new Date()).getTime() / 1000);
	if (!this.createdAt) {
		this.createdAt = ts;
	}
	next();
});

ordersSchema.plugin(mongoosePaginate);

module.exports = {
	orders,
	ordersModel: mongoose.model('orders', ordersSchema)
}

/*
{
    "_id" : ObjectId("60d2ead962c1af67f4298971"),
    "merchantId" : ObjectId("60bf22295f56963be78a378a"),
    "customerId" : ObjectId("60afb77f1070f3640258b97b"),
    "products" : [ 
        {
            "productId" : ObjectId("60d24e3008221c0c400ee96d"),
            "wpq" : [ 
                {
                    "wp_id" : "1",
                    "quantity" : "2"
                }
            ],
            "subTotal" : ""
        }, 
        {
            "productId" : ObjectId("60d24e3008221c0c400ee96f"),
            "wpq" : [ 
                {
                    "wp_id" : "2",
                    "quantity" : "2"
                }, 
                {
                    "wp_id" : "4",
                    "quantity" : "3"
                }
            ],
            "subTotal" : ""
        }
    ],
    "__v" : 0
}
*/