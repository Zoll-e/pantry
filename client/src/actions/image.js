import axios from 'axios';
import {IMAGE_UPLOADED, IMAGE_UPLOAD_FAIL} from "./types";

export const upload = photo => async dispatch => {

    const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    try {
      const formData = new FormData();
      formData.append('photo', photo);
      const res = await axios.post('/api/photos', formData, config );
      dispatch({ type: IMAGE_UPLOADED, payload: res.data });


          } catch (error) {
            dispatch({type: IMAGE_UPLOAD_FAIL})
        }
  
};


