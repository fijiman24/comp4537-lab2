const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // read JSON BODY
app.use(express.urlencoded({ extended: true })); // read URL encoded bdoy

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/chatbot', (req, res) => {
    // Handle incoming request
    // Process message and get response
    const message = req.body.message;
    console.log(message);
    const number = message.match(/\d+/);
    if (number) {
        fetch(`http://numbersapi.com/${number}?type=trivia`).then(response => response.text()).then(data => {
            res.json({
                text: data
            });
        }).catch(error => {
            res.json({
                text: "Sorry, I couldn't find any information about that number."
            });
        });
    } else {
        res.json({
            text: "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about."
        });
    }
});

// $(document).ready(function () {
//     $('#chatbot-form').submit(function (event) {
//         event.preventDefault();
//         const message = $('#chatbot-input').val();
//         $.ajax({
//             type: 'POST',
//             url: 'http://localhost:3000/chatbot',
//             data: {
//                 message: message
//             },
//             success: function (response) {
//                 let newMessage = $('<div>', {
//                     class: 'message'
//                 }).text(response.text);
//                 let removeButton = $('<button>', {
//                     class: 'remove-button'
//                 }).text('Remove');
//                 newMessage.append(removeButton);
//                 $('#chat-history').append(newMessage);
//             }
//         });
//     });
// });

// $(document).on('click', '.remove-button', function() {
// 	$(this).parent().remove();
// });