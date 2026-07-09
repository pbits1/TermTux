---
title: "PYTHON"
section: 4
category: 49
icon: "terminal"
---

# PYTHON


  What is it?
    The most popular programming language. Used for scripting,
    web development, AI/ML, automation, data science. Ubuntu comes
    with Python pre-installed, but you may need extras.

    # Check installed version:
    python3 --version

    # Install pip (Python package manager — like npm for Python):
    sudo apt install python3-pip

    # Install a Python package:
    pip3 install package_name

    # Create a virtual environment (isolated Python workspace):
    #   WHY? To keep project dependencies separate, so one project
    #   doesn't break another.
    python3 -m venv myproject_env

    # Activate the virtual environment:
    source myproject_env/bin/activate

    # Now pip install works inside this environment only:
    pip install flask requests numpy

    # Deactivate when done:
    deactivate

    # Run a Python script:
    python3 script.py

    # Open Python interactive shell:
    python3


