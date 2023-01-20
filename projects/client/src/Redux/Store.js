import { configureStore } from "@reduxjs/toolkit"
import ButtonSlice from "./ButtonSlice"
import ModalSlice from "./ModalSlice"
import PropertySlice from "./PropertySlice"
import DoneCreatePropertiesSlice from "./DoneCreatePropertiesSlice"
import MorePictureProperty from "./MorePictureProperty"
import CertainDate from "./CertainDate"


export default configureStore({
    reducer: {
        ButtonSlice,
        ModalSlice,
        PropertySlice,
        DoneCreatePropertiesSlice,
        MorePictureProperty,
        CertainDate,
    }
})