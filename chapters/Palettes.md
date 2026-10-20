# Chapter: Palettes

- Ask: Which of a theme's sixteen colours can be seen?

A terminal names sixteen colours, 0 to 15: black, red, green, yellow, blue, magenta, cyan and white, then the bright of each. A colour is faint here where it reads under 3 on its theme's own background, WCAG's least for large text and marks.

## Faint colours

**Which colours are faint on their own background?** Colour 8, bright black, is faint in 392 of the 816 themes, and colour 0, black, in 537: a dark theme's black is near its background, as a light one's white is. Of the six hues, red is faint most often (94 themes) and green least (50).

The grey, colour 8, against the six hues: the themes in which each is faint.

> [!CARD:bars] Faint on its own background, themes
> |  | Grey (8) | Red | Green | Yellow | Blue | Magenta | Cyan |
> |---|---|---|---|---|---|---|---|
> | Themes | 392 | 94 | 50 | 76 | 92 | 84 | 68 |

### Normal and bright

The six hues, normal (1 to 6) above and bright (9 to 14) below, on one scale. Black and white are left out: a dark theme's black and a light one's white are meant to sit near the background.

> [!CARD:bars] The hues faint, normal and bright, themes
> |  | Red | Green | Yellow | Blue | Magenta | Cyan |
> |---|---|---|---|---|---|---|
> | Normal | 94 | 50 | 76 | 92 | 84 | 68 |
> | Bright | 56 | 72 | 84 | 62 | 69 | 77 |
> - Scale: shared

## Blue

**In which themes is blue hardest to see?** Blue, colour 4, is faint in 92 themes, 75 of them dark: a dark blue on a dark ground. Faintest is [C64](../C/C64.md)'s, at 1.75.

The ten faintest blues, each beside its background.

| Theme | Background | Blue | Contrast |
| --- | --- | --- | --- |
| [C64](../C/C64.md) | `#40318d` | `#6657b3` | 1.75 |
| [CGA](../C/CGA.md) | `#000000` | `#0d0db7` | 1.76 |
| [Ocean](../O/Ocean.md) | `#224fbc` | `#0000b2` | 1.77 |
| [Konsolas](../K/Konsolas.md) | `#060606` | `#2323a5` | 1.79 |
| [IBM 5153 CGA (Black)](../I/IBM%205153%20CGA%20(Black).md) | `#000000` | `#0000c4` | 1.80 |
| [Everforest Light Med](../E/Everforest%20Light%20Med.md) | `#efebd4` | `#7fbbb3` | 1.81 |
| [Spring](../S/Spring.md) | `#ffffff` | `#1dd3ee` | 1.81 |
| [Tinacious Design Light](../T/Tinacious%20Design%20Light.md) | `#f8f8ff` | `#00cbff` | 1.81 |
| [Aurora](../A/Aurora.md) | `#23262e` | `#102ee4` | 1.82 |
| [Klein Void](../K/Klein%20Void.md) | `#0b0d14` | `#002fa7` | 1.82 |

## Brights

**Do the bright colours differ from the normal ones?** In 578 themes all eight bright colours differ from their normal ones; in 6 none do. 277 themes use fewer than sixteen different colours in their palette.

The palettes of the themes that ship by default, the best read first, each in words: its background and text, then colours 0 to 7, then 8 to 15, each drawn after its hex. A table of sixteen colours a row is too wide to read on a phone.

**[GitHub Light High Contrast](../G/GitHub%20Light%20High%20Contrast.md)** on `#ffffff`, text `#0e1116`: `#0e1116` `#a0111f` `#024c1a` `#3f2200` `#0349b4` `#622cbc` `#1b7c83` `#66707b`; bright `#4b535d` `#86061d` `#055d20` `#4e2c00` `#1168e3` `#844ae7` `#3192aa` `#88929d`.

**[GitHub Dark High Contrast](../G/GitHub%20Dark%20High%20Contrast.md)** on `#0a0c10`, text `#f0f3f6`: `#7a828e` `#ff9492` `#26cd4d` `#f0b72f` `#71b7ff` `#cb9eff` `#39c5cf` `#d9dee3`; bright `#9ea7b3` `#ffb1af` `#4ae168` `#f7c843` `#91cbff` `#dbb7ff` `#56d4dd` `#ffffff`.

**[Tomorrow Night Bright](../T/Tomorrow%20Night%20Bright.md)** on `#000000`, text `#eaeaea`: `#000000` `#d54e53` `#b9ca4a` `#e7c547` `#7aa6da` `#c397d8` `#70c0b1` `#ffffff`; bright `#404040` `#d54e53` `#b9ca4a` `#e7c547` `#7aa6da` `#c397d8` `#70c0b1` `#ffffff`.

**[GitHub Dark Default](../G/GitHub%20Dark%20Default.md)** on `#0d1117`, text `#e6edf3`: `#484f58` `#ff7b72` `#3fb950` `#d29922` `#58a6ff` `#bc8cff` `#39c5cf` `#b1bac4`; bright `#6e7681` `#ffa198` `#56d364` `#e3b341` `#79c0ff` `#d2a8ff` `#56d4dd` `#ffffff`.

**[GitHub Light Default](../G/GitHub%20Light%20Default.md)** on `#ffffff`, text `#1f2328`: `#24292f` `#cf222e` `#116329` `#4d2d00` `#0969da` `#8250df` `#1b7c83` `#6e7781`; bright `#57606a` `#a40e26` `#1a7f37` `#633c01` `#218bff` `#a475f9` `#3192aa` `#8c959f`.

**[Tomorrow Night Blue](../T/Tomorrow%20Night%20Blue.md)** on `#002451`, text `#ffffff`: `#000000` `#ff9da4` `#d1f1a9` `#ffeead` `#bbdaff` `#ebbbff` `#99ffff` `#ffffff`; bright `#4c4c4c` `#ff9da4` `#d1f1a9` `#ffeead` `#bbdaff` `#ebbbff` `#99ffff` `#ffffff`.

**[GitHub Light Colorblind](../G/GitHub%20Light%20Colorblind.md)** on `#ffffff`, text `#24292f`: `#24292f` `#b35900` `#0550ae` `#4d2d00` `#0969da` `#8250df` `#1b7c83` `#6e7781`; bright `#57606a` `#8a4600` `#0969da` `#633c01` `#218bff` `#a475f9` `#3192aa` `#8c959f`.

**[Night Owl](../N/Night%20Owl.md)** on `#011627`, text `#d6deeb`: `#011627` `#ef5350` `#22da6e` `#addb67` `#82aaff` `#c792ea` `#21c7a8` `#ffffff`; bright `#575656` `#ef5350` `#22da6e` `#ffeb95` `#82aaff` `#c792ea` `#7fdbca` `#ffffff`.

**[Rose Pine](../R/Rose%20Pine.md)** on `#191724`, text `#e0def4`: `#26233a` `#eb6f92` `#31748f` `#f6c177` `#9ccfd8` `#c4a7e7` `#ebbcba` `#e0def4`; bright `#6e6a86` `#eb6f92` `#31748f` `#f6c177` `#9ccfd8` `#c4a7e7` `#ebbcba` `#e0def4`.

**[Dracula](../D/Dracula.md)** on `#282a36`, text `#f8f8f2`: `#21222c` `#ff5555` `#50fa7b` `#f1fa8c` `#bd93f9` `#ff79c6` `#8be9fd` `#f8f8f2`; bright `#6272a4` `#ff6e6e` `#69ff94` `#ffffa5` `#d6acff` `#ff92df` `#a4ffff` `#ffffff`.

**[Atom One Light](../A/Atom%20One%20Light.md)** on `#f9f9f9`, text `#2a2c33`: `#000000` `#de3e35` `#3f953a` `#d2b67c` `#2f5af3` `#950095` `#3f953a` `#bbbbbb`; bright `#000000` `#de3e35` `#3f953a` `#d2b67c` `#2f5af3` `#a00095` `#3f953a` `#ffffff`.

**[GitHub Dark Colorblind](../G/GitHub%20Dark%20Colorblind.md)** on `#0d1117`, text `#c9d1d9`: `#484f58` `#ec8e2c` `#58a6ff` `#d29922` `#58a6ff` `#bc8cff` `#39c5cf` `#b1bac4`; bright `#6e7681` `#fdac54` `#79c0ff` `#e3b341` `#79c0ff` `#d2a8ff` `#56d4dd` `#ffffff`.

**[Gruvbox Dark Hard](../G/Gruvbox%20Dark%20Hard.md)** on `#1d2021`, text `#ebdbb2`: `#1d2021` `#cc241d` `#98971a` `#d79921` `#458588` `#b16286` `#689d6a` `#a89984`; bright `#928374` `#fb4934` `#b8bb26` `#fabd2f` `#83a598` `#d3869b` `#8ec07c` `#ebdbb2`.

**[Rose Pine Moon](../R/Rose%20Pine%20Moon.md)** on `#232136`, text `#e0def4`: `#393552` `#eb6f92` `#3e8fb0` `#f6c177` `#9ccfd8` `#c4a7e7` `#ea9a97` `#e0def4`; bright `#6e6a86` `#eb6f92` `#3e8fb0` `#f6c177` `#9ccfd8` `#c4a7e7` `#ea9a97` `#e0def4`.

**[Catppuccin Mocha](../C/Catppuccin%20Mocha.md)** on `#1e1e2e`, text `#cdd6f4`: `#45475a` `#f38ba8` `#a6e3a1` `#f9e2af` `#89b4fa` `#f5c2e7` `#94e2d5` `#bac2de`; bright `#585b70` `#f7aec2` `#c2ecbf` `#fcd682` `#aeccfc` `#f398da` `#b1eae1` `#a6adc8`.

**[Kanagawa Wave](../K/Kanagawa%20Wave.md)** on `#1f1f28`, text `#dcd7ba`: `#090618` `#c34043` `#76946a` `#c0a36e` `#7e9cd8` `#957fb8` `#6a9589` `#c8c093`; bright `#727169` `#e82424` `#98bb6c` `#e6c384` `#7fb4ca` `#938aa9` `#7aa89f` `#dcd7ba`.

**[Kanagawa Dragon](../K/Kanagawa%20Dragon.md)** on `#181616`, text `#c5c9c5`: `#0d0c0c` `#c4746e` `#8a9a7b` `#c4b28a` `#8ba4b0` `#a292a3` `#8ea4a2` `#c8c093`; bright `#a6a69c` `#e46876` `#87a987` `#e6c384` `#7fb4ca` `#938aa9` `#7aa89f` `#c5c9c5`.

**[Gruvbox Dark](../G/Gruvbox%20Dark.md)** on `#282828`, text `#ebdbb2`: `#282828` `#cc241d` `#98971a` `#d79921` `#458588` `#b16286` `#689d6a` `#a89984`; bright `#928374` `#fb4934` `#b8bb26` `#fabd2f` `#83a598` `#d3869b` `#8ec07c` `#ebdbb2`.

**[TokyoNight](../T/TokyoNight.md)** on `#1a1b26`, text `#c0caf5`: `#15161e` `#f7768e` `#9ece6a` `#e0af68` `#7aa2f7` `#bb9af7` `#7dcfff` `#a9b1d6`; bright `#414868` `#f7768e` `#9ece6a` `#e0af68` `#7aa2f7` `#bb9af7` `#7dcfff` `#c0caf5`.

**[TokyoNight Night](../T/TokyoNight%20Night.md)** on `#1a1b26`, text `#c0caf5`: `#15161e` `#f7768e` `#9ece6a` `#e0af68` `#7aa2f7` `#bb9af7` `#7dcfff` `#a9b1d6`; bright `#414868` `#f7768e` `#9ece6a` `#e0af68` `#7aa2f7` `#bb9af7` `#7dcfff` `#c0caf5`.

**[Gruvbox Light Hard](../G/Gruvbox%20Light%20Hard.md)** on `#f9f5d7`, text `#3c3836`: `#f9f5d7` `#cc241d` `#98971a` `#d79921` `#458588` `#b16286` `#689d6a` `#7c6f64`; bright `#928374` `#9d0006` `#79740e` `#b57614` `#076678` `#8f3f71` `#427b58` `#3c3836`.

**[Ayu](../A/Ayu.md)** on `#0b0e14`, text `#bfbdb6`: `#11151c` `#ea6c73` `#7fd962` `#f9af4f` `#53bdfa` `#cda1fa` `#90e1c6` `#c7c7c7`; bright `#686868` `#f07178` `#aad94c` `#ffb454` `#59c2ff` `#d2a6ff` `#95e6cb` `#ffffff`.

**[TokyoNight Moon](../T/TokyoNight%20Moon.md)** on `#222436`, text `#c8d3f5`: `#1b1d2b` `#ff757f` `#c3e88d` `#ffc777` `#82aaff` `#c099ff` `#86e1fc` `#828bb8`; bright `#444a73` `#ff757f` `#c3e88d` `#ffc777` `#82aaff` `#c099ff` `#86e1fc` `#c8d3f5`.

**[Gruvbox Light](../G/Gruvbox%20Light.md)** on `#fbf1c7`, text `#3c3836`: `#fbf1c7` `#cc241d` `#98971a` `#d79921` `#458588` `#b16286` `#689d6a` `#7c6f64`; bright `#928374` `#9d0006` `#79740e` `#b57614` `#076678` `#8f3f71` `#427b58` `#3c3836`.

**[Nightfox](../N/Nightfox.md)** on `#192330`, text `#cdcecf`: `#393b44` `#c94f6d` `#81b29a` `#dbc074` `#719cd6` `#9d79d6` `#63cdcf` `#dfdfe0`; bright `#575860` `#d16983` `#8ebaa4` `#e0c989` `#86abdc` `#baa1e2` `#7ad5d6` `#e4e4e5`.

**[Catppuccin Macchiato](../C/Catppuccin%20Macchiato.md)** on `#24273a`, text `#cad3f5`: `#494d64` `#ed8796` `#a6da95` `#eed49f` `#8aadf4` `#f5bde6` `#8bd5ca` `#b8c0e0`; bright `#5b6078` `#f2a7b2` `#bde3b0` `#f4e3c1` `#adc5f7` `#f493da` `#a5ded6` `#a5adcb`.

**[Tomorrow Night](../T/Tomorrow%20Night.md)** on `#1d1f21`, text `#c5c8c6`: `#000000` `#cc6666` `#b5bd68` `#f0c674` `#81a2be` `#b294bb` `#8abeb7` `#ffffff`; bright `#4c4c4c` `#cc6666` `#b5bd68` `#f0c674` `#81a2be` `#b294bb` `#8abeb7` `#ffffff`.

**[Ayu Mirage](../A/Ayu%20Mirage.md)** on `#1f2430`, text `#cccac2`: `#171b24` `#ed8274` `#87d96c` `#facc6e` `#6dcbfa` `#dabafa` `#90e1c6` `#c7c7c7`; bright `#686868` `#f28779` `#d5ff80` `#ffd173` `#73d0ff` `#dfbfff` `#95e6cb` `#ffffff`.

**[Everforest Dark Hard](../E/Everforest%20Dark%20Hard.md)** on `#1e2326`, text `#d3c6aa`: `#7a8478` `#e67e80` `#a7c080` `#dbbc7f` `#7fbbb3` `#d699b6` `#83c092` `#f2efdf`; bright `#a6b0a0` `#f85552` `#8da101` `#dfa000` `#3a94c5` `#df69ba` `#35a77c` `#fffbef`.

**[Nord](../N/Nord.md)** on `#2e3440`, text `#d8dee9`: `#3b4252` `#bf616a` `#a3be8c` `#ebcb8b` `#81a1c1` `#b48ead` `#88c0d0` `#e5e9f0`; bright `#596377` `#bf616a` `#a3be8c` `#ebcb8b` `#81a1c1` `#b48ead` `#8fbcbb` `#eceff4`.

**[Gruvbox Material](../G/Gruvbox%20Material.md)** on `#1d2021`, text `#d4be98`: `#141617` `#ea6926` `#c1d041` `#eecf75` `#6da3ec` `#fd9bc1` `#fe9d6e` `#ffffff`; bright `#4c4c4c` `#d3573b` `#c1d041` `#eecf75` `#2c86ff` `#fd9bc1` `#92a5df` `#ffffff`.

**[TokyoNight Storm](../T/TokyoNight%20Storm.md)** on `#24283b`, text `#c0caf5`: `#1d202f` `#f7768e` `#9ece6a` `#e0af68` `#7aa2f7` `#bb9af7` `#7dcfff` `#a9b1d6`; bright `#4e5575` `#f7768e` `#9ece6a` `#e0af68` `#7aa2f7` `#bb9af7` `#7dcfff` `#c0caf5`.

**[Everforest Dark Med](../E/Everforest%20Dark%20Med.md)** on `#232a2e`, text `#d3c6aa`: `#7a8478` `#e67e80` `#a7c080` `#dbbc7f` `#7fbbb3` `#d699b6` `#83c092` `#f2efdf`; bright `#a6b0a0` `#f85552` `#8da101` `#dfa000` `#3a94c5` `#df69ba` `#35a77c` `#fffbef`.

**[Tomorrow Night Eighties](../T/Tomorrow%20Night%20Eighties.md)** on `#2d2d2d`, text `#cccccc`: `#000000` `#f2777a` `#99cc99` `#ffcc66` `#6699cc` `#cc99cc` `#66cccc` `#ffffff`; bright `#595959` `#f2777a` `#99cc99` `#ffcc66` `#6699cc` `#cc99cc` `#66cccc` `#ffffff`.

**[Tomorrow](../T/Tomorrow.md)** on `#ffffff`, text `#4d4d4c`: `#000000` `#c82829` `#718c00` `#eab700` `#4271ae` `#8959a8` `#3e999f` `#bfbfbf`; bright `#000000` `#c82829` `#718c00` `#eab700` `#4271ae` `#8959a8` `#3e999f` `#ffffff`.

**[Gruvbox Material Dark](../G/Gruvbox%20Material%20Dark.md)** on `#282828`, text `#d4be98`: `#282828` `#ea6962` `#a9b665` `#d8a657` `#7daea3` `#d3869b` `#89b482` `#d4be98`; bright `#7c6f64` `#ea6962` `#a9b665` `#d8a657` `#7daea3` `#d3869b` `#89b482` `#ddc7a1`.

**[Catppuccin Frappe](../C/Catppuccin%20Frappe.md)** on `#303446`, text `#c6d0f5`: `#51576d` `#e78284` `#a6d189` `#e5c890` `#8caaee` `#f4b8e4` `#81c8be` `#b5bfe2`; bright `#626880` `#eda0a2` `#b9dba2` `#ecd7ae` `#adc2f3` `#f38ed8` `#98d2ca` `#a5adce`.

**[Nordfox](../N/Nordfox.md)** on `#2e3440`, text `#cdcecf`: `#3b4252` `#bf616a` `#a3be8c` `#ebcb8b` `#81a1c1` `#b48ead` `#88c0d0` `#e5e9f0`; bright `#53648d` `#d06f79` `#b1d196` `#f0d399` `#8cafd2` `#c895bf` `#93ccdc` `#e7ecf4`.

**[Everforest Dark Soft](../E/Everforest%20Dark%20Soft.md)** on `#293136`, text `#d3c6aa`: `#7a8478` `#e67e80` `#a7c080` `#dbbc7f` `#7fbbb3` `#d699b6` `#83c092` `#f2efdf`; bright `#a6b0a0` `#f85552` `#8da101` `#dfa000` `#3a94c5` `#df69ba` `#35a77c` `#fffbef`.

**[GitHub Dark Dimmed](../G/GitHub%20Dark%20Dimmed.md)** on `#22272e`, text `#adbac7`: `#545d68` `#f47067` `#57ab5a` `#c69026` `#539bf5` `#b083f0` `#39c5cf` `#909dab`; bright `#636e7b` `#ff938a` `#6bc46d` `#daaa3f` `#6cb6ff` `#dcbdfb` `#56d4dd` `#cdd9e5`.

**[Gruvbox Material Light](../G/Gruvbox%20Material%20Light.md)** on `#fbf1c7`, text `#654735`: `#fbf1c7` `#c14a4a` `#6c782e` `#b47109` `#45707a` `#945e80` `#4c7a5d` `#654735`; bright `#a89984` `#c14a4a` `#6c782e` `#b47109` `#45707a` `#945e80` `#4c7a5d` `#4f3829`.

**[Atom One Dark](../A/Atom%20One%20Dark.md)** on `#21252b`, text `#abb2bf`: `#21252b` `#e06c75` `#98c379` `#e5c07b` `#61afef` `#c678dd` `#56b6c2` `#abb2bf`; bright `#767676` `#e06c75` `#98c379` `#e5c07b` `#61afef` `#c678dd` `#56b6c2` `#abb2bf`.

**[Catppuccin Latte](../C/Catppuccin%20Latte.md)** on `#eff1f5`, text `#4c4f69`: `#bcc0cc` `#d20f39` `#40a02b` `#df8e1d` `#1e66f5` `#ea76cb` `#179299` `#5c5f77`; bright `#acb0be` `#e7103f` `#46b02f` `#e49931` `#3878f6` `#ef95d7` `#19a1a8` `#6c6f85`.

**[Rose Pine Dawn](../R/Rose%20Pine%20Dawn.md)** on `#faf4ed`, text `#575279`: `#f2e9e1` `#b4637a` `#286983` `#ea9d34` `#56949f` `#907aa9` `#d7827e` `#575279`; bright `#9893a5` `#b4637a` `#286983` `#ea9d34` `#56949f` `#907aa9` `#d7827e` `#575279`.

**[Kanagawa Lotus](../K/Kanagawa%20Lotus.md)** on `#f2ecbc`, text `#545464`: `#1f1f28` `#c84053` `#6f894e` `#77713f` `#4d699b` `#b35b79` `#597b75` `#545464`; bright `#8a8980` `#d7474b` `#6e915f` `#836f4a` `#6693bf` `#624c83` `#5e857a` `#43436c`.

**[Ayu Light](../A/Ayu%20Light.md)** on `#f8f9fa`, text `#5c6166`: `#000000` `#ea6c6d` `#6cbf43` `#eca944` `#3199e1` `#9e75c7` `#46ba94` `#bababa`; bright `#686868` `#f07171` `#86b300` `#f2ae49` `#399ee6` `#a37acc` `#4cbf99` `#d1d1d1`.

**[Everforest Light Hard](../E/Everforest%20Light%20Hard.md)** on `#f2efdf`, text `#5c6a72`: `#7a8478` `#e67e80` `#9ab373` `#ceaf72` `#7fbbb3` `#d699b6` `#83c092` `#b2af9f`; bright `#a6b0a0` `#f85552` `#8da101` `#dfa000` `#3a94c5` `#df69ba` `#35a77c` `#fffbef`.

**[iTerm2 Solarized Dark](../I/iTerm2%20Solarized%20Dark.md)** on `#002b36`, text `#839496`: `#073642` `#dc322f` `#859900` `#b58900` `#268bd2` `#d33682` `#2aa198` `#eee8d5`; bright `#335e69` `#cb4b16` `#586e75` `#657b83` `#839496` `#6c71c4` `#93a1a1` `#fdf6e3`.

**[Everforest Light Med](../E/Everforest%20Light%20Med.md)** on `#efebd4`, text `#5c6a72`: `#7a8478` `#e67e80` `#9ab373` `#c1a266` `#7fbbb3` `#d699b6` `#83c092` `#b2af9f`; bright `#a6b0a0` `#f85552` `#8da101` `#dfa000` `#3a94c5` `#df69ba` `#35a77c` `#fffbef`.

**[TokyoNight Day](../T/TokyoNight%20Day.md)** on `#e1e2e7`, text `#3760bf`: `#e9e9ed` `#f52a65` `#587539` `#8c6c3e` `#2e7de9` `#9854f1` `#007197` `#6172b0`; bright `#a1a6c5` `#f52a65` `#587539` `#8c6c3e` `#2e7de9` `#9854f1` `#007197` `#3760bf`.

**[Everforest Light Soft](../E/Everforest%20Light%20Soft.md)** on `#e5dfc5`, text `#5c6a72`: `#7a8478` `#e67e80` `#8da666` `#c1a266` `#72aea6` `#c98ca9` `#76b385` `#a5a292`; bright `#99a393` `#f85552` `#8da101` `#d29300` `#3a94c5` `#df69ba` `#35a77c` `#fffbef`.

**[iTerm2 Solarized Light](../I/iTerm2%20Solarized%20Light.md)** on `#fdf6e3`, text `#657b83`: `#073642` `#dc322f` `#859900` `#b58900` `#268bd2` `#d33682` `#2aa198` `#bbb5a2`; bright `#002b36` `#cb4b16` `#586e75` `#657b83` `#839496` `#6c71c4` `#93a1a1` `#fdf6e3`.


The other chapters: [Dark or light](./Dark%20or%20light.md), [Contrast](./Contrast.md), [Alike](./Alike.md). The questions and their answers worked out from upstream's files apart: [FAQ](../FAQ.md).
