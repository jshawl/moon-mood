module.exports = function(mongoose){
  var PhoneSchema = mongoose.Schema({
    number: String,
    entries: [mongoose.Schema.Types.Mixed]
  })
  PhoneSchema.methods.toJSON = function(){
   var obj = this.toObject()
   delete obj._id
   delete obj.__v
   return obj
  }
  var Phone = mongoose.model("Phone",PhoneSchema)
  return Phone
}
