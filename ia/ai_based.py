from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)

model_name = "gpt2-medium"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

conversation_history = []
whoami = 'Answer'
max_length = 100

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    user_message = data.get("prompt", "")
    user_login = data.get("login", "")

    conversation_history.append(f"Question : {user_message}")

    if len(conversation_history) > 5:
        conversation_history.pop(0)

    prompt = "\n".join(conversation_history) + f"\n{whoami} :"

    print(f"\n> BEGIN GENERATION FULL PROMPT :\n{prompt}\n")

    tokenizer.model_max_length = 512
    inputs = tokenizer.encode(prompt, return_tensors="pt")
    outputs = model.generate(
        inputs,
        max_length=max_length + len(inputs[0]),
        num_return_sequences=1,
        temperature=1.2,
        top_p=0.95,
        repetition_penalty=1.3,
        no_repeat_ngram_size=2,
        num_beams=4,
        early_stopping=True
    )

    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    bot_response = generated_text.split(f"{whoami} :")[-1].strip()

    print("> generated text :\n", generated_text)

    conversation_history.append(f"{whoami} : {bot_response}")

    return jsonify({"generated_text": bot_response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
