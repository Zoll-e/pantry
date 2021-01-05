import axios from 'axios';
import {IMAGE_UPLOADED, IMAGE_UPLOAD_FAIL,IMAGE_REMOVED,IMAGE_REMOVE_FAIL} from "./types";

export const upload = async picture => {

    const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    try {
      const formData = new FormData();
      formData.append('picture', picture);
      const res = await axios.post('/api/picture', formData, config );
      const route = res.data;
      return route;

          } catch (error) {
            alert(error)
        }
  
};

export const clearOldPicture = picture => async dispatch => {

  try {
   
    const res = await axios.delete(`/api/picture/${picture}`);
    console.log(res.data);
    dispatch({ type: IMAGE_REMOVED, payload: res.data });


        } catch (error) {
          dispatch({type: IMAGE_REMOVE_FAIL})
      }

};
