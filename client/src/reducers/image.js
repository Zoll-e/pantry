import { IMAGE_UPLOADED, IMAGE_UPLOAD_FAIL } from "../actions/types";

const initialState = {
  loading: true,
  route: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case IMAGE_UPLOADED:
      return {
        ...state,
        loading: false,
        route: payload,
      };

      case IMAGE_UPLOAD_FAIL:
          return {
              ...state,
              loading: false,
              photoId:'',
          };

    default:
     return  state;
  }
}
