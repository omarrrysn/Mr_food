import React, { useRef, useState } from 'react';
import LayoutAdmin from '../../../compounent/Admin/LayoutAdmin'; 
import axios from 'axios';





const Order = () => {
 	
	const [selectedFile, setSelectedFile] = useState(null);

	const [imageLink, setImageLink] = useState(null);

	const [validationError, setValidationError] = useState(null);

	const fileInputRef = useRef(null);

	const handleFileChange = (event) => {

		const file = event.target.files[0];
		if(file)
		{
			const allowedExtension = ['.jpg', '.png'];
			const selectedFileExtension = file.name.split('.').pop().toLowerCase();
			if(allowedExtension.includes('.' + selectedFileExtension))
			{
				setSelectedFile(file);
				setValidationError(null);
			}
			else
			{
				setSelectedFile(null);
				setValidationError('Invalid file extension. Please select a file with .jpg or .png extension.');
				fileInputRef.current.value = '';
			}
		}

	};

	const handleUpload = async() => {
		if(selectedFile)
		{
			const formData = new FormData();
			formData.append('file', selectedFile);
			const response = await fetch('http://localhost/tutorial/file-upload/api/upload.php', {
				method : 'POST',
				body : formData
			});

			const responseData = await response.json();
			setImageLink(responseData.image_link);
			fileInputRef.current.value = '';
		}
		else
		{
			setValidationError('Please select a file before uploading.');
		}
	};




  return (
    <LayoutAdmin>
      <div style={{ height: '200px' }}></div>
      <div >
      <input type="file" ref={fileInputRef} onChange={handleFileChange} />
            <br></br>
            <br></br>
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    </LayoutAdmin>
  );

  };
export default Order;
