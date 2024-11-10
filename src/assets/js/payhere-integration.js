// import md5 from 'crypto-js/md5'
let merchantId = "1228603";
let amountFormated = parseFloat("150").toLocaleString('en-us', { minimumFractionDigits: 2 }).replaceAll(',', '');
let merchantSecret = 'MjU0NjIwNTQ5OTEwNTQ1NDQ1NDQwNDUwNjEzNjA0MjU5NzUzNTM4';
// let hashedSecret = md5(merchantSecret).toString().toUpperCase();
// let hash = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();
let hash="091D877C45FAA314BDB237F9ED581E39";
function PayNow(
) {
    window.payhere.onCompleted = function onCompleted(orderId) {
        console.log("Payment completed. OrderID:" + orderId);
    };

    window.payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
    };

    window.payhere.onError = function onError(error) {
        console.log("Error:" + error);
    };

    var payment = {
        sandbox: true,
        merchant_id: merchantId,
        return_url: "http://localhost:4200",
        cancel_url: "http://localhost:4200",
        notify_url: "http://localhost:4200",
        order_id: "12345",
        items: "Demo Item",
        amount: 1200,
        currency: "LKR",
        hash: hash,
        first_name: "Shyamalee",
        last_name: "Abeysinghe",
        email: "sabey@gmai.com",
        phone: "0774741197",
        country: "Sri lanka",
        city: "Mathugama",
        address: "Hayahaula, Thiniyawala",
        custom_1: "asfaf",
    };
    window.payhere.startPayment(payment);
}

document.getElementById('payhere-payment').onclick = function (e) {
    console.log("okkkkkkkkkkkkkkkk")
    PayNow();
};