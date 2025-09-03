// add this before event code to all pages where PII data postback is expected and appropriate 
ttq.identify({
	"email": "<hashed_email_address>", // string. The email of the customer if available. It must be hashed with SHA-256 on the client side.
	"phone_number": "<hashed_phone_number>", // string. The phone number of the customer if available. It must be hashed with SHA-256 on the client side.
	"external_id": "<hashed_external_id>" // string. Any unique identifier, such as loyalty membership IDs, user IDs, and external cookie IDs.It must be hashed with SHA-256 on the client side.
});

ttq.track('ViewContent', {});

ttq.track('LK_EN_female', {});

ttq.track('AddToCart', {
	"contents": [
		{
			"content_id": "666" // string. ID of the product. Example: "1077218".
		}
	],
	"value": "1", // number. Value of the order or items sold. Example: 100.
	"currency": "USD" // string. The 4217 currency code. Example: "USD".
});

ttq.track('Contact', {});

ttq.track('LK_EN_welcome', {});