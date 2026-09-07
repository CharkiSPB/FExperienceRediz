'use client';
import { Component, ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('ErrorBoundary:', error, info); }

  render() {
    if (this.state.hasError) return this.props.fallback || <div className="p-8 text-center text-red-400">Произошла ошибка загрузки блока</div>;
    return this.props.children;
  }
}