<template>
<div class="container">
  <form id='myForm' class="contact" @submit.prevent='createProduct()' enctype="multipart/form-data">
    <h3>Create New Product</h3>
    <h4>Contact us today, and get reply with in 24 hours!</h4>
    <fieldset>
      <input
        v-model='form.name'
        placeholder="Name Product"
        type="text"
        tabindex="1"
        required
        autofocus
        >
    </fieldset>
    <fieldset>
        <table>
            <tr>
                <td>
                    Brand
                </td>
                <td>
                    <select v-model='form.brand'>
                        <option>Audi</option>
                        <option>BMW</option>
                        <option>Ferrari</option>
                        <option>Lamborghini</option>
                        <option>Mercedes-Benz</option>
                        <option>Porsche</option>
                        <option>Honda</option>
                        <option>Toyota</option>
                    </select>
                </td>
            </tr>
        </table>
    </fieldset>
    <fieldset>
        <table>
            <tr>
                <td>
                    Price
                </td>
                <td>
                    <input
                        v-model='form.price'
                        type='number'
                        placeholder="Price"
                        tabindex="2"
                        required
                        >
                </td>
            </tr>
        </table>
    </fieldset>
    <fieldset>
        <table>
            <tr>
                <td>
                    Stock
                </td>
                <td>
                    <input
                        v-model='form.stock'
                        placeholder="Stock"
                        type="number"
                        tabindex="3"
                        >
                </td>
            </tr>
        </table>
    </fieldset>
    <fieldset>
      <input
        @change="takeFile()"
        ref="file"
        type="file"
        name='file'
        tabindex="4"
        class="form-control-file"
        id="exampleFormControlFile1"
        >
    </fieldset>
    <fieldset>
      <textarea
        v-model='form.description'
        placeholder="Description"
        tabindex="5"
        required
        ></textarea>
    </fieldset>
    <fieldset>
      <button
        id="contact-submit"
        data-submit="...Sending"
        >Save

      </button>
    </fieldset>
  </form>

</div>

</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      form: {
        name: '',
        brand: '',
        price: 0,
        description: '',
        stock: 0,
        url: ''
      },
      isloading: false,
      file: ''
    }
  },
  methods: {
    takeFile () {
      const file = this.$refs.file.files[0]
      console.log(file)
      this.file = file
    },
    createProduct () {
      console.log(this.file)
      let myForm = document.getElementById('myForm')

      const name = this.form.name
      const brand = this.form.brand
      const price = this.form.price
      const description = this.form.description
      const stock = this.form.stock
      // 2 jm bermasalah lagi tidak bisa mendapatkan new FormData() udh search mngkn blum ketemu tidak bisa append.. udah di coba masukin object bisa tapi tidak kebaca juga oleh gcs
      // dari server aman krna dicoba tembak di postman bisa

      let formData = new FormData()
      formData.append('image', this.file) 
      formData.append('name', name) 
      formData.append('brand', brand) 
      formData.append('price', price) 
      formData.append('description', description) 
      formData.append('stock', stock) 


      // formData = this.file
      console.log(formData)
      this.isloading = true
      axios({
        method: 'post',
        url: 'http://dreamcarserver.dreamcarofficial.com/products',
        headers: {
          token: localStorage.getItem('token')
        },
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(({ data }) => {
          swal.fire({
            type: 'success',
            title: 'yess',
            text: data.msg
          })
          this.isloading = false
          this.$router.push('/admin/setting')
        })
        .catch(err => {
          console.log(err)
          this.isloading = false
        })
    }
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400italic,400,300,600);

* {
	margin:0;
	padding:0;
	box-sizing:border-box;
	-webkit-box-sizing:border-box;
	-moz-box-sizing:border-box;
	-webkit-font-smoothing:antialiased;
	-moz-font-smoothing:antialiased;
	-o-font-smoothing:antialiased;
    align-items: center;
    text-align: center;
	text-rendering:optimizeLegibility;
}

.container {
	max-width:400px;
	width:100%;
	margin:0 auto;
	position:relative;
}

#contact input[type="text"], #contact input[type="email"], #contact input[type="tel"], #contact input[type="url"], #contact textarea, #contact button[type="submit"] { font:400 12px/16px "Open Sans", Helvetica, Arial, sans-serif; }

.contact {
	background:#F9F9F9;
	padding:25px;
	margin:50px 0;
    width:35%
}

.contact h3 {
	color: #F96;
	display: block;
	font-size: 30px;
	font-weight: 400;
}

.contact h4 {
	margin:5px 0 15px;
	display:block;
	font-size:13px;
}

fieldset {
	border: medium none !important;
	margin: 0 0 10px;
	min-width: 100%;
	padding: 0;
	width: 100%;
}

.contact input[type="text"], #contact input[type="email"], #contact input[type="tel"], #contact input[type="url"], #contact textarea {
	width:100%;
	border:1px solid #CCC;
	background:#FFF;
	margin:0 0 5px;
	padding:10px;
}

.contact input[type="text"]:hover, #contact input[type="email"]:hover, .contact input[type="tel"]:hover, #contact input[type="url"]:hover, .contact textarea:hover {
	-webkit-transition:border-color 0.3s ease-in-out;
	-moz-transition:border-color 0.3s ease-in-out;
	transition:border-color 0.3s ease-in-out;
	border:1px solid #AAA;
}

.contact textarea {
	height:100px;
	max-width:100%;
  resize:none;
}

.contact button[type="submit"] {
	cursor:pointer;
	width:100%;
	border:none;
	background:#0CF;
	color:#FFF;
	margin:0 0 5px;
	padding:10px;
	font-size:15px;
}

.contact button[type="submit"]:hover {
	background:#09C;
	-webkit-transition:background 0.3s ease-in-out;
	-moz-transition:background 0.3s ease-in-out;
	transition:background-color 0.3s ease-in-out;
}

.contact button[type="submit"]:active { box-shadow:inset 0 1px 3px rgba(0, 0, 0, 0.5); }

.contact input:focus, #contact textarea:focus {
	outline:0;
	border:1px solid #999;
}
::-webkit-input-placeholder {
 color:#888;
}
:-moz-placeholder {
 color:#888;
}
::-moz-placeholder {
 color:#888;
}
:-ms-input-placeholder {
 color:#888;
}

</style>
