{
  description = "Flake to manage a nodejs dev environment";

  inputs.nixpkgs.url = "nixpkgs/nixpkgs-unstable";

  outputs = inputs:
    let
      system = "x86_64-linux";
      pkgs = inputs.nixpkgs.legacyPackages.${system};
    in
    {
      devShell.${system} = pkgs.mkShell rec {
        name = "node-shell";
        buildInputs = with pkgs; [ 
          nodejs
          typescript
          ollama 
        ];
        shellHook = ''
          echo "Setting up Ollama with the Qwen model..."          
          ollama pull smollm
          echo "Starting Ollama serve in the background..."
          ollama serve &
        '';
      };
    };
}
