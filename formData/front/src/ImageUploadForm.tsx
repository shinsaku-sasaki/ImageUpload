import React, { useState, ChangeEvent } from "react";
import "./ImageUploadForm.css";

const ImageUploadForm: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      // サーバーへの送信ロジック
      fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSubmissionMessage("アップロードに成功しました！");
        })
        .catch((error) => {
          console.error(error);
          setSubmissionMessage(
            "アップロードに失敗しました。エラーが発生しました。"
          );
        })
        .finally(() => {
          // オブジェクトURLを解放
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }
        });
    }
  };

  return (
    <div className="image-upload-form">
      <input
        type="file"
        id="image-input"
        accept="image/*"
        onChange={handleImageChange}
      />
      {previewUrl && (
        <div className="preview-container">
          <img src={previewUrl} alt="Preview" className="preview-image" />
        </div>
      )}
      <button onClick={handleSubmit}>送信</button>
      {submissionMessage && <p>{submissionMessage}</p>}
    </div>
  );
};

export default ImageUploadForm;
