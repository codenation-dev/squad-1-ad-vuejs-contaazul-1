import { shallowMount } from '@vue/test-utils'
import Login from "@/views/Login"

describe("Login", () => {
  it("Deve ser um instância do vue", () => {
    const wrapper = shallowMount(Login, {
      mocks: {
        $store: {
          getters: {
            getUserEmail: "teste@teste.com"
          }
        }
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
})
