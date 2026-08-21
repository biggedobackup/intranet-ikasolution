import * as React from 'react';
import { FaTriangleExclamation, FaArrowRotateRight } from 'react-icons/fa6';

export interface IErrorBoundaryProps {
  resetKey?: string;
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  public state: IErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('[IKA Intranet] Erreur non gérée dans un composant :', error, info.componentStack);
  }

  public componentDidUpdate(prevProps: IErrorBoundaryProps): void {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  public render(): React.ReactNode {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="pt-6 sm:pt-8 pb-14 min-h-screen bg-slate-100 text-slate-800">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">
            <div className="flex justify-center">
              <span className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                <FaTriangleExclamation className="text-2xl" />
              </span>
            </div>
            <h1 className="mt-4 text-lg font-black text-ikaBlueDark">Une erreur est survenue</h1>
            <p className="mt-2 text-sm text-slate-500">
              Cette page a rencontré un problème inattendu. Vous pouvez réessayer ou revenir à l&apos;accueil.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => this.setState({ hasError: false })}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ikaBlue text-white font-bold text-xs hover:bg-blue-600 shadow transition"
              >
                <FaArrowRotateRight /> Réessayer
              </button>
              <a
                href="#page-accueil"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                Retour à l&apos;accueil
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default ErrorBoundary;
