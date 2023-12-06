const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "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";
//Keep in mind that in the free version, you'll have limited usage.
//I used my own API key called idk
//we can learn about API & its options in the request body role, temperature
const inputInitHeight /*This is for textarea*/ = chatInput.scrollHeight;


const createChatLi = (message, className)=>{
    //Create a chat<li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ?  `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span> <p></p>`;
    chatLi.innerHTML = chatContent;
    //To remove the problem of html tags being applied to bot text, we removed ${message} from p and added line 18
    chatLi.querySelector("p").textContent = message;
    //Now, the message will be set as teh text of the paragraph, whether it contains html tags or not.
    return chatLi;
}
const generateResponse = (incomingChatLi) => {
    //https://platform.openai.com/docs/api-reference
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant."
              },
              {
                role: "user",
                content: userMessage
              }
            ]
            //At this point we will get the OpenAI API key
            //Go to https://platform.openai.com/account/api-keys
            //Log in to your account and generate a free API key
        })
    }

    // Send POST request to API, get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        // console.log(data);
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        // console.log(error);
        //We will add some style to the error message. One Occurrence of it is
        // when browser is offline. Inspect -> Network -> Throttling -> Offline
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please, try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    //We want the above respons in the chatbox.
}
const handleChat = () => {
    userMessage = chatInput.value.trim();
    // console.log(userMessage); This prints out: Now to show the message in the chatbox
    if(!userMessage) return;
    //Let's keep the chat input blank once the message is sent
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`; //This line
    //resets the textarea height to its default height once a message is sent.

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    //Let's autoscroll to the bottom if chat is overflowing!
    chatbox.scrollTo(0, chatbox.scrollHeight);

    //This is for the bot "thinking..." hehe
    setTimeout(() => {
        // Display "Thinking..." message while waiting fo the response
        const incomingChatLi = createChatLi("Thinking...", "incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 200);
    //Let's use the OpenAI API to get the response to the message
}

//We will now autoresize the textarea size to fit content.
chatInput.addEventListener("input", () =>{
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

//Here we are trying to make the message send on the enter key
//and add a new line on the shift+enter key.

chatInput.addEventListener("keydown", (e) =>{
    //If Enter key is pressed without Shift key & the window
    //width is greater than 800px,handle the chat.
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handleChat();
    }
});


sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
