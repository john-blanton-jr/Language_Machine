import logging
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import base64
import googletrans as gt
from elevenlabs import Voice, VoiceSettings, generate, play, set_api_key
from elevenlabs.api import History

# Initialize logging
logging.basicConfig(level=logging.DEBUG)

# Set API key (recommend using environment variables for this)
set_api_key("")

text_to_voice = APIRouter()


class TextModel(BaseModel):
    text: str
    language: str


def generate_voice(text: str):
    try:
        audio = generate(
            text,
            voice=Voice(
                voice_id="3wXNDSCmqI0eGyImxahE",
                settings=VoiceSettings(
                    stability=0.7,
                    similarity_boost=0.5,
                    style=0.0,
                    use_speaker_boost=True,
                ),
            ),
            model="eleven_multilingual_v2",
        )
        audio_base64 = base64.b64encode(audio).decode("utf-8")
        return audio_base64
    except Exception as e:
        logging.error(f"Error in generate_voice: {e}")
        raise HTTPException(status_code=500, detail="Voice generation failed")


@text_to_voice.post("/text_to_voice")
async def translate(text_model: TextModel):
    text = text_model.text
    language = text_model.language
    logging.debug(f"Received text: {text} in language: {language}")

    try:
        translated_text = gt.translate(text, language)
    except Exception as e:
        logging.error(f"Translation failed: {e}")
        return JSONResponse(status_code=500, content={"message": "Translation failed"})

    try:
        audio_base64 = generate_voice(
            translated_text
        )  # Update this line to use the text attribute of the translated_text object
    except HTTPException:
        return JSONResponse(
            status_code=500, content={"message": "Voice generation failed"}
        )

    return JSONResponse(content={"translated_audio": audio_base64})
