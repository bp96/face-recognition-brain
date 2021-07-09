import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center ma pa2'>
    <div style={{position:"relative"}}>
    	<img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/> 	 
 		 {
  		  	box.map((singleBox, i) => {
  		  		const {topRow, rightCol, bottomRow, leftCol} = singleBox;
  		  		return (<div key={i} id='face' className="bounding-box" style={{top: topRow, right: rightCol, bottom: bottomRow, left: leftCol}}></div>)
  		  	})
  		  }
       </div>
    </div>
  );
}

export default FaceRecognition;