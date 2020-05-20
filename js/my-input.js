Vue.component('my-input', {
  props: {

    type: { // название пропса. в нашем примере это может быть ещё "placeholder", "title" и пр.
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },

    title: {
      type: String,
      required: true,
    },

    required: {
      type: Boolean,
      required: false,
    },

    value: {
      type: String,
    },

    pattern: {
      required: false,
    },

    errormessage: {
      type: String,
    },
  },

  data() {
    return {
      answers: this.value,
      isValidate: true
    }
  },

  methods: {
    checkValidity() {  // для обнуления ошибки  (чтобы убрать красное) после начала ввода
      this.isValidate = true;
    },
    updateValue: function (value) {
      this.$emit('input', value);
      if (this["required"] && (value === "")) {
        this.isValidate = false;
        alert("This is a required field");
      } else {
        this.isValidate = true;
        if (value != "" && !value.match(this["pattern"])) {
          alert(this["errormessage"]);
          this.isValidate = false;
        }
      }
    },
  },

  template: `

<div>
<label>{{ this.title }} <span v-if="this.required">*</span>
<input 
:type="this.type"  
:placeholder="this.placeholder"  
:value="value"
@focus="checkValidity" 
@blur="updateValue($event.target.value)" 
:class="{'valid-input':isValidate, 'error-input':!isValidate}"
>
</label>
</div>
`
})







