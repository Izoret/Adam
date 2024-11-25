from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)

model_name = "gpt2-medium"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

conversation_history = []
whoami = 'Answer'
max_length = 200

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    user_message = data.get("prompt", "")
    user_login = data.get("login", "")

    conversation_history.append(f"User input : {user_message}")

    if len(conversation_history) > 5:
        conversation_history.pop(0)

    prompt = "\n".join(conversation_history) + f"\n{whoami} : "

    print(f"\n> BEGIN GENERATION FULL PROMPT :\n{prompt}\n")

    tokenizer.model_max_length = 512
    inputs = tokenizer.encode(prompt, return_tensors="pt")
    outputs = model.generate(
        inputs,
        max_length=max_length + len(inputs[0]),
        num_return_sequences=1,
        temperature=0.5,  # Lower temperature for more focused and deterministic output
        top_p=0.6,        # Narrow the range of word choices to the most probable ones
        repetition_penalty=1.5,  # Higher penalty to avoid repeating or contradicting itself
        no_repeat_ngram_size=3,  # Ensure larger sequences are not repeated
        num_beams=8,      # Increase the number of beams for better optimization of the output
        early_stopping=True
    )

    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    bot_response = generated_text.split(f"{whoami} : ")[-1].strip()

    print("> generated text :\n", generated_text)

    conversation_history.append(f"{whoami} : {bot_response}")

    return jsonify({"generated_text": bot_response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
