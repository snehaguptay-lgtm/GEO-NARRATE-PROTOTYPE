import subprocess
import sys
import os
import time

def main():
    print("=" * 60)
    print("  GeoNarrate — SIH 2026 Prototype Launcher")
    print("  Explainable Change-Detection & Query Assistant for Satellite Imagery")
    print("=" * 60)
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(base_dir, "backend")
    frontend_dir = os.path.join(base_dir, "frontend")

    print("\n[1/2] Starting FastAPI Backend on http://localhost:8000 ...")
    backend_cmd = [sys.executable, "-m", "uvicorn", "app.main:app", "--port", "8000", "--reload"]
    backend_proc = subprocess.Popen(backend_cmd, cwd=backend_dir)

    print("\n[2/2] Starting React Vite Frontend on http://localhost:3000 ...")
    # Check npm command on Windows
    npm_cmd = "npm.cmd" if os.name == "nt" else "npm"
    frontend_cmd = [npm_cmd, "run", "dev"]
    frontend_proc = subprocess.Popen(frontend_cmd, cwd=frontend_dir)

    print("\n" + "=" * 60)
    print("  GeoNarrate Services Running!")
    print("  Backend API:  http://localhost:8000")
    print("  Frontend App: http://localhost:3000")
    print("  Press Ctrl+C to stop both servers.")
    print("=" * 60 + "\n")

    try:
        backend_proc.wait()
        frontend_proc.wait()
    except KeyboardInterrupt:
        print("\nStopping GeoNarrate servers...")
        backend_proc.terminate()
        frontend_proc.terminate()
        sys.exit(0)

if __name__ == "__main__":
    main()
