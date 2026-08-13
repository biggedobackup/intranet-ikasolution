import * as React from 'react';
import { FaTriangleExclamation } from 'react-icons/fa6';

export const Page404: React.FC = () => {
  return (
    <main className="pt-32 sm:pt-36 pb-16 min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="flex justify-center">
            <FaTriangleExclamation className="text-6xl text-ikaRed" />
          </div>
          <h1 className="text-5xl font-black text-ikaBlueDark mt-4">404</h1>
          <p className="text-slate-500 mt-2">Page introuvable</p>
          <a
            href="#page-accueil"
            className="inline-block mt-6 bg-ikaBlue text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-600 shadow transition"
          >
            Retour à l&apos;accueil
          </a>
        </div>
      </div>
    </main>
  );
};

export default Page404;
