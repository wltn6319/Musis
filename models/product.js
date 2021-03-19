import mongoose from "mongoose";

let Schema = mongoose.Schema;
let { autoIncrement } = require('mongoose-plugin-autoinc');
// Define Schemes
let ProductSchema = new Schema({
  name : { //제품명
    type : String,
    required: [true, '제목을 입력해주세요']
},
thumbnail : String, //이미지 파일명
price : Number, // 가격
description : String, // 설명
created_at : { // 작성일
    type : Date,
    default : Date.now()
},
username : String  //작성자추가
});

// virtual은 호출되면 실행된다.
// get으로 getDate 변수를 호출할 때 시간이 찍힘
ProductSchema.virtual('getDate').get(function(){
  var date = new Date(this.created_at);
  return {
      year : date.getFullYear(),
      month : date.getMonth()+1,
      day : date.getDate()
  };
});

// 자동으로 1씩 증가하는 id 생성
// model : 생성할 document 이름
// field : primary key, startAt : 1부터 시작

ProductSchema.plugin( autoIncrement , { model : 'products' , field : 'id' , startAt : 1 });

const model = mongoose.model("products", ProductSchema);
export default model;


/*
// Create new Product document
productSchema.statics.create = function (payload) {
  // this === model
  const product = new this(payload);
  // return Promise
  return product.save();
};

// Find All
productSchema.statics.findAll = function () {
  // return promise
  return this.find({});
};

// Find One by name
productSchema.statics.findOneByName = function (name) {
  return this.findOne({ name });
};

// Update by name
productSchema.statics.updateByName = function(name, payload) {
  // { new: true }: return the modified document rather than the original.
  // defaults to false
  return this.findOneAndUpdate({ name }, payload, { new: true });
};

// Delete by name
productSchema.statics.deleteByName = function (name) {
  return this.remove({ name });
};
*/


// 모델 생성 예
// const Product = mongoose.model('Product', productSchema);
// 실제 collection의 이름은 Products로 자동 변환되어 사용될 것임
/*
값을 넣는 방법
const product = new Product({
  name: '',
  description: '',
  thumbnail: '',
  price: 가격,
  username: user_id
});

OR

const product = new Product();
product.name = '';
product.description = '';
product.thumbnail = '';
product.price = 가격;
product.username = user_id;

*/

/*
 - Statics model methods(Statics)
const Product = mongoose.model('Product', productSchema);

// Statics model methods
Product.find({ }, function(err, product) {
  if(err) throw err;
  console.log(product);
});

OR

Product.find({})
  .then(product => console.log(product))
  .catch(err => console.log(err))



 - Document instance methods(Methods)
const Product = mongoose.model('Product', productSchema);

//model instance (= document)
const product = new Product({
  name: '',
  description: '',
  thumbnail: '',
  price: 가격,
  username: user_id
});

product.save
  .then(() => console.log('Saved successfully'));

*/