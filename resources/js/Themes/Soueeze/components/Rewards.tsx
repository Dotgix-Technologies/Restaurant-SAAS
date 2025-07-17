'use client'

import { useState } from 'react'
import data from '../data.json'
import { RewardsConfig } from '../datatype'

const rewards = data.rewards as RewardsConfig

export default function Rewards() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    store_id: '',
    confirm: false,
  })
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async () => {
    if (!form.phone || !form.name || !form.store_id || !form.confirm) {
      alert('Please fill all required fields and agree to terms.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setMessage('Thank you for signing up!')
      setOpen(true)
      setForm({ name: '', phone: '', store_id: '', confirm: false })
    }, 2000)
  }

  return (
    <section
      className="flex justify-center w-full text-center py-10"
      style={{
        backgroundImage: `url('${rewards.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="mx-auto w-full max-w-2xl px-4">
        <h2 className="text-teal-500 italic text-2xl font-semibold pb-3">{rewards.tagline}</h2>
        <h3 className="text-5xl font-black text-gray-900 uppercase mb-4">{rewards.title}</h3>

        <form className="w-full">
          <div className="flex justify-center w-full py-8 gap-10">
            <div className="w-full lg:w-1/2">
              <label className="block uppercase tracking-wide text-gray-600 text-sm font-bold mb-2">
                {rewards.fields.nameLabel}
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full shadow-lg h-16 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none"
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block uppercase tracking-wide text-gray-600 text-sm font-bold mb-2">
                {rewards.fields.phoneLabel}
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full shadow-lg h-16 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none"
                type="text"
                placeholder="Phone"
              />
            </div>
          </div>

          <div className="mb-6">
            <select
              name="store_id"
              value={form.store_id}
              onChange={handleChange}
              className="w-full h-16 shadow-lg text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none"
            >
              <option value="">{rewards.fields.storeLabel}</option>
              {rewards.stores.map(store => (
                <option key={store.value} value={store.value}>
                  {store.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 pt-6 flex items-start">
            <label className="block text-gray-500 font-bold">
              <input
                name="confirm"
                type="checkbox"
                checked={form.confirm}
                onChange={handleChange}
                className="mr-2 border-gray-300 leading-tight"
              />
              <span className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
                {rewards.consentText}{' '}
                <a href={rewards.termsLink.href} className="text-cyan-500">
                  {rewards.termsLink.label}
                </a>{' '}
                and{' '}
                <a href={rewards.privacyLink.href} className="text-cyan-500">
                  {rewards.privacyLink.label}
                </a>
              </span>
            </label>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className={`w-full h-12 text-white font-bold uppercase rounded-xl focus:outline-none transition ${
              loading ? 'bg-gray-400' : 'bg-teal-600 hover:bg-teal-700'
            }`}
            disabled={loading}
          >
            {loading ? rewards.submitButton.loadingLabel : rewards.submitButton.label}
          </button>

          {open && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-xl max-w-md text-center shadow-xl">
                <p className="text-gray-800 text-lg font-medium">{message}</p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
