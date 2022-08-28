import React from "react";

interface constraintes {
  audio: boolean;
  video: boolean;
}

const useRecorder = (constraintes: constraintes) => {
  const chunks = React.useRef([]);
  const mediaStream = React.useRef<MediaStream>(null);
  const mediaRecorder = React.useRef<MediaRecorder>(null);
  const [blob, setBlob] = React.useState<Blob>();
  const [url, setURL] = React.useState<string>();
  const [isRecording, setisRecording] = React.useState<boolean>(false);

  async function StartRecording() {
    if (!mediaStream.current) mediaStream.current = await getStream();
    mediaRecorder.current = new MediaRecorder(mediaStream.current);
    mediaRecorder.current.ondataavailable = ({ data }: BlobEvent) => {
      chunks.current.push(data);
    };
    mediaRecorder.current.onstart = () => {
      chunks.current = [];
    };

    mediaRecorder.current.onstop = () => {
      const b: Blob = new Blob(chunks.current);
      setBlob(b);
      const l = URL.createObjectURL(b);
      setURL(l);
      setisRecording(false);
      mediaRecorder.current = null;
      mediaStream.current = null;
    };
    mediaRecorder.current.start();
  }

  function StopRecording() {
    if (!mediaRecorder.current) return false;

    const isRecording = mediaRecorder.current.state === "recording";
    if (!isRecording) return false;
    mediaRecorder.current.stop();
    mediaStream.current.getTracks().map((track: MediaStreamTrack): void => {
      const isTrackActive = track.readyState === "live";
      if (isTrackActive) track.stop();
    });
  }

  const getStream = React.useCallback(async () => {
    return await navigator.mediaDevices.getUserMedia(constraintes);
  }, [constraintes]);

  return {
    StartRecording,
    StopRecording,
    chunks: chunks.current,
    isRecording,
    blob,
    url,
  };
};

export default useRecorder;
