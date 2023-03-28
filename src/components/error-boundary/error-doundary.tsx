import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorMessage from "../error-message/error-message";

interface IErrorBoundaryProps {
  children?: ReactNode
}

interface IErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: ErrorInfo) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;