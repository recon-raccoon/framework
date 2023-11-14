<img src="https://github.com/recon-raccoon/framework/raw/main/assets/logo-text-wide.svg" width="350px">

![GitHub](https://img.shields.io/github/license/recon-raccoon/framework?style=flat-square&color=%2317999f)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/recon-raccoon/framework/main?style=flat-square&color=%2317999f)
![NodeJs Version](https://img.shields.io/badge/nodejs-v19.0.0+-%2361b04a?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/recon-raccoon/framework?style=flat-square)
&nbsp; 
[English](/README.md) | [普通话](/README.cn.md)

**Recon Raccoon**, an open-source intelligence (**OSINT**) automation tool, seamlessly integrates with a multitude of data sources. By employing a diverse range of techniques in data analysis, it transforms information into a smoothly navigable format, simplifying **attack surface** identification and streamlining **threat intelligence** processes.

We offer a versatile solution comprising a [web-based interface](https://github.com/recon-raccoon/web) with robust database support and a sophisticated, configurable [command-line interface (CLI)](https://github.com/recon-raccoon/cli), both constructed using the [Recon Raccoon framework](https://github.com/recon-raccoon/framework). 

<br>

```
$ npm i @recon-raccoon/framework
```
Using your preferred Node.js package manager, install the latest [framework package](https://www.npmjs.com/package/@recon-raccoon/framework).

#

### Framework Overview
This foundational code serves as the backbone for Recon Raccoon. Both the [command-line interface (CLI)](https://github.com/recon-raccoon/cli) and the [web UI](https://github.com/recon-raccoon/web) are derived from this repository. The real strength of Recon Raccoon lies in its utilization of open-source external projects, including [the Sherlock project](https://github.com/sherlock-project/sherlock), and others, to create a comprehensive attack surface. Instead of merely appropriating code and presenting it as a new project, we integrate these projects, make adjustments, and incorporate our unique techniques to construct a detailed profile of the target.

### Open-Source Intelligence Vectors

In an era where online privacy is often overlooked unless actively pursued, it's crucial to recognize that much of the information people share is open source. Here are several vectors we analyze to gather insights:

- **Usernames**: Scrutinizing online usernames associated with the target to unveil digital identities and potential connections.

- **Reviews**: Examining reviews related to the target, whether on products, services, or locations, to discern sentiments, preferences, and geographical footprints.

- **Blockchain**: Investigating blockchain data for relevant information, transactions, or interactions that may offer valuable context.

- **Social Media Posts**: Delving into social media platforms to extract information from posts, comments, and interactions, providing a comprehensive view of the target's online presence.

- **Linguistic Profiling**: Analyzing language patterns and styles used by the target in various online communications to establish a linguistic profile, aiding in understanding communication tendencies.

- **Picture Aggregation**: Compiling and analyzing images associated with the target across different platforms to identify patterns, connections, or additional information.

- **Data Breach / Leaks**: Indexed data breaches are a rich source of information, serving as a potential gold mine for insights. However, it's crucial to note that in certain circumstances, this approach may raise ethical concerns.

- [Many more...]()
