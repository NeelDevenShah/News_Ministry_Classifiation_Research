from pytube import YouTube
import subprocess
import wave
import speech_recognition as sr

# !pip install pytube
# !pip install subprocess.run
# !pip install wave
# !pip install SpeechRecognition

# TOBE: Add try, except, And in except id the process is remained half, than make the tmp folder empty


from pytube import YouTube
import subprocess
import wave
import speech_recognition as sr


def download_audio(video_link):
    try:
        video = YouTube(video_link)
        audio = video.streams.filter(
            only_audio=True, file_extension='mp4').first()
        audio.download("./youtube_to_text_model/tmp", "output_file.mp4")
        print('Download Completed, successfully....')
    except:
        print("Connection Error")


def convert_mp4_to_wav():

    command = ["ffmpeg", "-i", "./youtube_to_text_model/tmp/output_file.mp4", "-vn",
               "-acodec", "pcm_s16le", "./youtube_to_text_model/tmp/output_file.wav"]
    subprocess.run(command, check=True)
    subprocess.run(["rm", "./youtube_to_text_model/tmp/output_file.mp4"],
                   capture_output=True)
    print('Conversion of mp4 to wav completed....')


def get_wav_file_time():

    with wave.open("./youtube_to_text_model/tmp/output_file.wav", "rb") as wav_file:
        sample_rate = wav_file.getframerate()
        num_samples = wav_file.getnframes()
        duration = num_samples / sample_rate
        print('Time duration given, successfully......')
        return duration


def divide_wav_file_into_n_parts(n):

    input_file_path = "./youtube_to_text_model/tmp/output_file.wav"
    output_file_prefix = "./youtube_to_text_model/tmp/parted"

    with wave.open(input_file_path, "rb") as input_file:
        n_frames = input_file.getnframes()
        frame_rate = input_file.getframerate()
        frames_per_part = n_frames // n

        for i in range(n):
            start_frame = i * frames_per_part
            end_frame = (i + 1) * frames_per_part
            output_file_path = f"{output_file_prefix}_{i}.wav"

            with wave.open(output_file_path, "wb") as output_file:
                output_file.setparams(input_file.getparams())
                output_file.setnframes(end_frame - start_frame)

                frames = input_file.readframes(end_frame - start_frame)
                output_file.writeframes(frames)
        subprocess.run(
            ["rm", "./youtube_to_text_model/tmp/output_file.wav"], capture_output=True)
        print('Video frame division successful.....')


def printFiles(duration):
    final_text = ""
    r = sr.Recognizer()
    for i in range(int(duration/67.84)):
        with sr.AudioFile(f'./youtube_to_text_model/tmp/parted_{i}.wav') as source:
            audio = r.record(source)
            try:
                text = r.recognize_google(audio)
                final_text += text
                subprocess.run(
                    ["rm", f"./youtube_to_text_model/tmp/parted_{i}.wav"], capture_output=True)
            except TypeError:
                print(TypeError)
    print('Text response successfull.....')
    return final_text


def predict(link):

    download_audio(link)
    convert_mp4_to_wav()
    duration = get_wav_file_time()
    divide_wav_file_into_n_parts(int(duration/67.84))
    response_text = printFiles(duration)
    print('Exiting processing fucnction.....')
    return response_text
