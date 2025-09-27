let bot = new RiveScript();

const message_container = document.querySelector('.messages');
const form = document.querySelector('form');
const input_box = document.querySelector('input');

const brains = [
    "./brains/mainMenu.rive",
    "./brains/botVars.rive",
];

const title = `<pre class="title"><<< ADRIFT >>></pre>`;

const greeting = `<pre><span class='sub'>Live life adrift on the ocean.</span></pre>`;

const no_brains_msg = "<span class='sub'>Game files failed to load. Please try again later.</span>";

const loading_brains_msg = "<span class='sub'>Fetching game files... Please wait...</span>";

const brains_loaded_msg = "<span class='sub'>Files loaded! Starting game...</span>";

form.addEventListener('submit', (event) => {
    event.preventDefault();
    selfReply(input_box.value);
    input_box.value = '';
});


botReply(loading_brains_msg);
window.addEventListener('resize', checkResize);


function botReply(message) {
    message_container.innerHTML += `<div class="bot">${message}</div>`;
    location.href = '#latest';

    input_box.focus();
}

function selfReply(message) {
    message_container.innerHTML += `<div class="self">> ${message}</div>`;
    location.href = '#latest';

    bot.reply("local-user", message).then(function (reply) {
        botReply(reply);
    });
}


function botLoaded() {
    if (window.innerWidth < 1000) {
        window.location.replace("./links.html");
    } else {
        bot.loadFile(brains).then(botReady).catch(botNotReady);
    }
}

function botReady() {
    bot.sortReplies();
    botReply(brains_loaded_msg);
    botReply(title);
    botReply(greeting);

    bot.reply("local-user", "menu").then(function (reply) {
        botReply(reply);
    });

    input_box.focus();
}

function botNotReady(err) {
    console.log(no_brains_msg, err);
}