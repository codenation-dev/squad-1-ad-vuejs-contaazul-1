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

  it("Deve ser chamado a função de validaUser quando o click no botão de 'Login' for disparado", () => {
    const wrapper = shallowMount(Login, {
      mocks: {
        $store: {
          getters: {
            getUserEmail: null
          }
        }
      }
    })
    const validaUser = jest.fn()
    wrapper.setMethods({
      validaUser: validaUser
    })

    wrapper.find("button").trigger("click")
    expect(wrapper.vm.validaUser).toBeCalled()

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

    wrapper.find("button").trigger('click')
    expect(wrapper.vm.validaCamposVazios).toBeCalled()

  });

  it("Deve validar o vuelidate", () => {
    const wrapper = shallowMount(Login, {
      mocks: {
        $store: {
          getters: {
            getUserEmail: null
          }
        }
      }
    })
    wrapper.setData({
      email: "errorlogs@teste.com",
      password: "123456"
    })
    expect(wrapper.vm.$v.$invalid).toBeFalsy()
  });

  it("Deve ser chamado a função de login quando o click no botão de 'Login' for disparado", () => {
    const wrapper = shallowMount(Login, {
      mocks: {
        $store: {
          getters: {
            getUserEmail: null
          }
        }
      }
    })
    wrapper.setData({
      hasEmail: { password: "123456" },
      password: "123456"
    })
    wrapper.vm.loginUser()
    expect(wrapper.vm.login).toBeCalled
  });

})
