//import { shallowMount } from "@vue/test-utils"
import {RegisterView} from '@/views/Account/RegisterView.vue'
describe('RegisterView', ()=>{
    test('verifica que los datos en el register sean correctos', () =>{
        expect(RegisterView(RegisterView.password)).toEqual(RegisterView.ValidatePassword)
        
        //const component = wrapper.find('.login')

    })
})