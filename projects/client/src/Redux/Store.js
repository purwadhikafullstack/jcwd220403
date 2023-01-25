import { configureStore } from "@reduxjs/toolkit"
import ButtonSlice from "./ButtonSlice"
import DeleteProperty from "./DeleteProperty"
import DoneCreatePropertiesSlice from "./DoneCreatePropertiesSlice"
import MorePictureProperty from "./MorePictureProperty"
import CertainDate from "./CertainDate"


export default configureStore({
    reducer: {
        ButtonSlice,
        DeleteProperty,
        DoneCreatePropertiesSlice,
        MorePictureProperty,
        CertainDate,
    }
})