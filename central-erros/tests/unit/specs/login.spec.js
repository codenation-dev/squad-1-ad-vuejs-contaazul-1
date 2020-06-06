import { shallowMount } from '@vue/test-utils'
import Login from "@/views/Login"

describe("Login", () => {
  it("Deve ser um instância do vue", () => {
    const wrapper = shallowMount(Login, {
      mocks: {
        $store: {
          getters: {
            getUserEmail: null
          }
        }
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Deve definir o primeiro elemento input com o valor de email do usuário passado no getters", () => {
    const wrapper = shallowMount(Login, {
      mocks: {
        $store: {
          getters: {
            getUserEmail: "errorlogs@teste.com"
          }
        }
      }
    })
    const inputs = wrapper.findAll("input")
    const email = inputs.at(0);

    expect(email.element.value).toEqual("errorlogs@teste.com")
  });

  it("Deve definir o primeiro elemento input com o valor de email do usuário passado pelo data", () => {
    const wrapper = shallowMount(Login, {
      mocks: {
        $store: {
          getters: {
            getUserEmail: null
          }
        }
      },
      data: function () {
        return {
          email: "errorlogs@teste.com"
        }
      }
    })

    const inputs = wrapper.findAll("input")
    const password = inputs.at(0);

    expect(password.element.value).toEqual("errorlogs@teste.com")
  });

  it("Deve definir o segundo elemento input com o valor de senha do usuário passado pelo data", () => {
    const wrapper = shallowMount(Login, {
      mocks: {
        $store: {
          getters: {
            getUserEmail: null
          }
        }
      },
      data: function () {
        return {
          password: "123456"
        }
      }
    })

    const inputs = wrapper.findAll("input")
    const password = inputs.at(1);

    expect(password.element.value).toEqual("123456")
  });

  it("Deve ser chamado a função de validaCamposVazios quando o click no botão de 'Login' for disparado", () => {
    const wrapper = shallowMount(Login, {
      mocks: {
        $store: {
          getters: {
            getUserEmail: null
          }
        }
      }
    })

    wrapper.vm.validaCamposVazios = jest.fn()

    wrapper.findAll("button").trigger('click')
    expect(wrapper.vm.validaCamposVazios).toBeCalled()

  });

})
