{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    systems.url = "github:nix-systems/default";
  };

  outputs =
    inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      systems = import inputs.systems;
      perSystem =
        {
          pkgs,
          ...
        }:
        {
          devShells.default = pkgs.mkShell {
            packages = with pkgs; [ 
                deno
                jdk21 
            ];
          };

        };
    };
}
