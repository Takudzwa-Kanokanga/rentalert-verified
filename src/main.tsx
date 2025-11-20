import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API as string | undefined;
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;
const clerkKey = clerkPublishableKey ?? clerkFrontendApi;

const root = createRoot(document.getElementById("root")!);

if (clerkKey) {
	root.render(
		<ClerkProvider {...({ publishableKey: clerkKey, frontendApi: clerkFrontendApi } as any)}>
			<App />
		</ClerkProvider>
	);
} else {
	// Do not crash the app when Clerk keys are not provided. Warn and render without Clerk.
	// This allows the dev server to run while you add Clerk env vars.
	// Note: authentication features will be disabled until you set the publishable key.
	// Add `VITE_CLERK_PUBLISHABLE_KEY` or `VITE_CLERK_FRONTEND_API` to your .env.
	// Example: VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
	// Or: VITE_CLERK_FRONTEND_API=frontend-***
	// Restart the dev server after adding the env var.
	// eslint-disable-next-line no-console
	console.warn("Clerk publishable key not set. Rendering without ClerkProvider.");
	root.render(<App />);
}
