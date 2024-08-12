import mongoose,{Schema} from "mongoose";
const Data = new Schema({
    heading:{
        type:String,
        required:true
    },def:{
        type:String,
        default:""
    }
})

const FlipFuze = mongoose.model("FlipFuze",Data,"flipfuze");
export default FlipFuze;