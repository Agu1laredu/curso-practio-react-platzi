import { useContext, useState, useRef, useEffect } from 'react'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'

// Se optimizó el código eliminando la duplicación de código y utilizando useEffect
// para sincronizar los valores de los campos de edición con los datos actuales del usuario.

function MyAccount() {
  const context = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info')
  const form = useRef(null)
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  useEffect(() => {
    if (view === 'edit-user-info') {
      form.current.name.value = parsedAccount?.name || ''
      form.current.email.value = parsedAccount?.email || ''
      form.current.password.value = parsedAccount?.password || ''
    }
  }, [view, parsedAccount])

  const editAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    }

    // Update account
    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    context.setAccount(data)
  }

  const renderUserInfo = () => (
    <div className="flex flex-col w-80">
      <p>
        <span className="font-light text-sm">Name: </span>
        <span>{parsedAccount?.name}</span>
      </p>
      <p>
        <span className="font-light text-sm">Email: </span>
        <span>{parsedAccount?.email}</span>
      </p>
      <button
        className="border border-black rounded-lg mt-6 py-3"
        onClick={() => setView('edit-user-info')}
      >
        Edit
      </button>
    </div>
  )

  const renderEditUserInfo = () => (
    <form ref={form} className="flex flex-col gap-4 w-80">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-light text-sm">
          Your name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Peter"
          className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-light text-sm">
          Your email:
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="hi@helloworld.com"
          className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-light text-sm">
          Your password:
        </label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="******"
          className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
        />
      </div>
      <button
        className="bg-black text-white w-full rounded-lg py-3"
        onClick={() => {
          setView('user-info')
          editAccount()
        }}
      >
        Edit
      </button>
    </form>
  )

  const renderView = () =>
    view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()

  return (
    <Layout>
      <h1 className="font-medium text-xl text-center mb-6 w-80">My account</h1>
      {renderView()}
    </Layout>
  )
}

export default MyAccount
