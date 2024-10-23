import React from "react";

export default function ResetPasswordModal({
  isVisible,
  onClose,
  onSubmit,
  resetEmail,
  setResetEmail,
  resetMessage,
  resetError,
}) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-10 w-[500px] shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Réinitialisation du mot de passe
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4 mt-6">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <p className="text-sm text-gray-500 mb-9">
            Veuillez entrer l'adresse e-mail utilisée lors de votre inscription.
            Vous recevrez un e-mail contenant un lien pour réinitialiser votre
            mot de passe.
          </p>
          {resetMessage && (
            <p className="text-green-500 text-sm">{resetMessage}</p>
          )}
          {resetError && <p className="text-red-500 text-sm">{resetError}</p>}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}