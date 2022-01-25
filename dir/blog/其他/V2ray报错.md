---
title: V2ray报错
date: 2022-01-06 00:53:36
update:
categories: 其他
comments: true
tags:
    - V2ray
  
---
自 2022 年 1 月 1 日起，服务器端将默认禁用对于 MD5 认证信息 的兼容。任何使用 MD5 认证信息的客户端将无法连接到禁用 VMess MD5 认证信息的服务器端，从而导致服务端和客户端报错。

<!-- more -->
# 1.错误现象
```
客户端报错
app/proxyman/inbound: connection ends > proxy/socks: connection ends > context canceled
V2Ray 4.41.1 (V2Fly, a community-driven edition of V2Ray.) Custom (go1.16.6 windows/amd64)
2022/01/06 00:43:37 [Info] [2751399112] app/proxyman/outbound: failed to process outbound traffic > proxy/vmess/outbound: connection ends > context canceled
服务端报错
rejected  common/drain: common/drain: unable to drain connection > websocket: close 1000 (normal) > proxy/vmess/encoding: invalid user: VMessAEAD is enforced and a non VMessAEAD connection is received. You can still disable this security feature with environment variable v2ray.vmess.aead.forced = false . You will not be able to enable legacy header workaround in the future.
```
# 2.解决方法
加黑部分

在 v4.28.1 版本后，**客户端AlterID 设置为0**代表启用 VMessAEAD ；服务端为自动适配，可同时兼容启用和未开启 VMessAEAD 的客户端。
对于 VMess MD5 认证信息的兼容可以被关闭。(v4.35.0+)

客户端可通过设置环境变量 **V2RAY_VMESS_AEAD_DISABLED=true** 强行禁用 VMessAEAD （不推荐，仅用于兼容服务端版本在 v4.28.1 前且设置了 **alterId=0** ）

VMess MD5 认证信息 玷污机制
为了进一步对抗可能的探测和封锁，自 v4.24 版本起，每个 VMess 认证数据的服务器端结构都会包含一个一次写入的玷污状态标记，初始状态为无瑕状态，当服务器检测到重放探测时或者因为其他原因入站连接出错以致校验数据不正确时，该连接所对应的请求认证数据会被玷污。

被玷污的认证数据无法被用于建立连接，当攻击者或客户端使用被玷污的认证数据建立连接时，服务器会输出包含 "invalid user" "ErrTainted" 的错误信息，并阻止该连接。

当服务器没有受到重放攻击时，该机制对正常连接的客户端没有影响。如果服务器正在被重放攻击，可能会出现连接不稳定的情况。

拥有服务器 UUID 以及其他连接数据的恶意程序可能根据此机制对服务器发起拒绝服务攻击，受到此类攻击的服务可以通过修改 proxy/vmess/validator.go 文件中 func (v *TimedUserValidator) BurnTaintFuse(userHash []byte) error 函数的 atomic.CompareAndSwapUint32(pair.taintedFuse, 0, 1) 语句为 atomic.CompareAndSwapUint32(pair.taintedFuse, 0, 0) 来解除服务器对此类攻击的安全保护机制。使用 VMessAEAD 认证机制的客户端不受到 VMess MD5 认证信息 玷污机制 的影响。

#VMess MD5 认证信息 淘汰机制
VMessAEAD 协议已经经过同行评议并已经整合了相应的修改。 VMess MD5 认证信息 的淘汰机制已经启动。

自 2022 年 1 月 1 日起，服务器端将默认禁用对于 MD5 认证信息 的兼容。任何使用 MD5 认证信息的客户端将无法连接到禁用 VMess MD5 认证信息的服务器端。

**在服务器端可以通过设置环境变量 v2ray.vmess.aead.forced = true 以关闭对于 MD5 认证信息的兼容。 或者 v2ray.vmess.aead.forced = false 以强制开启对于 MD5 认证信息 认证机制的兼容 （不受到 2022 年自动禁用机制的影响） 。 (v4.35.0+)**

