from setuptools import setup, find_packages

setup(
    name="sixsense-engine",
    version="0.1.0",
    packages=find_packages(),
    python_requires=">=3.9",
    entry_points={"console_scripts": ["sixsense=cli:main"]},
)
