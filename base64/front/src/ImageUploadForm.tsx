import React, { useState, ChangeEvent } from "react";
import "./ImageUploadForm.css";

const ImageUploadForm: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // サーバーへの送信ロジック
    fetch("http://localhost:3000/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: selectedImage,
      }),
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
      });
  };

  return (
    <div className="image-upload-form">
      <input
        type="file"
        id="image-input"
        accept="image/*"
        onChange={handleImageChange}
      />
      {selectedImage && (
        <div className="preview-container">
          <img src={selectedImage} alt="Preview" className="preview-image" />
        </div>
      )}
      <button onClick={handleSubmit}>送信</button>
      {submissionMessage && <p>{submissionMessage}</p>}
    </div>
  );
};

export default ImageUploadForm;
