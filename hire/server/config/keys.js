module.exports = {
    domainEnv: {
        local: {
            g_protocol: "http",
            g_portal_domain: ".localhost:3000",
            g_quizzes_domain: ".localhost:5000",
            g_prograd_portal: "http://localhost:6080/"
        },
        dev: {
            g_protocol: "https",
            g_portal_domain: ".dev.hire.prograd.org",
            g_quizzes_domain: ".dev.quizzes.prograd.org",
            g_prograd_portal: "https://dev.prograd.org/"
        },
        staging: {
            g_protocol: "https",
            g_portal_domain: ".staging.hire.prograd.org",
            g_quizzes_domain: ".staging.quizzes.prograd.org",
            g_prograd_portal: "https://prograd.org/"
        },
        prod: {
            g_protocol: "https",
            g_portal_domain: ".hire.prograd.org",
            g_quizzes_domain: ".quizzes.prograd.org",
            g_prograd_portal: "https://prograd.org/"
        }
    },
    mongodb: {
        local: {
            host: "localhost",
            port: "8081",
            database: "quizr_platform_dev",
        },
        dev: [
            {   
                host: "franklin-shard-00-01.wi9bk.mongodb.net",
                port: "27017",
                database: "prograd_recruit_dev",
                username: "prograd_recruit_dev_user",
                password: "e4SzQtaUlzwsIvJl",
                host_1: "franklin-shard-00-00.wi9bk.mongodb.net",
                port_1: "27017",
                host_2: "franklin-shard-00-02.wi9bk.mongodb.net",
                port_2: "27017",
                replicaSet: "atlas-dv4ys4-shard-0"
            },
            {
                host: "franklin-shard-00-01.wi9bk.mongodb.net",
                port: "27017",
                database: "prograd_sr_dev",
                username: "prograd_sr_dev_user",
                password: "8ij3WzaxLB4cUP1q",
                host_1: "franklin-shard-00-00.wi9bk.mongodb.net",
                port_1: "27017",
                host_2: "franklin-shard-00-02.wi9bk.mongodb.net",
                port_2: "27017",
                replicaSet: "atlas-dv4ys4-shard-0",
            },
            {
                host: "franklin-shard-00-01.wi9bk.mongodb.net",
                port: "27017",
                database: "quizr_platform_dev",
                username: "psr_quizr_dev_user",
                password: "azcZ8jGjnyk6THam",
                host_1: "franklin-shard-00-00.wi9bk.mongodb.net",
                port_1: "27017",
                host_2: "franklin-shard-00-02.wi9bk.mongodb.net",
                port_2: "27017",
                replicaSet: "atlas-dv4ys4-shard-0"
            },
            {   
                host: "franklin-shard-00-01.wi9bk.mongodb.net",
                port: "27017",
                database: "quizr_dev",
                username: "psr_quizr_dev_user",
                password: "azcZ8jGjnyk6THam",
                host_1: "franklin-shard-00-00.wi9bk.mongodb.net",
                port_1: "27017",
                host_2: "franklin-shard-00-02.wi9bk.mongodb.net",
                port_2: "27017",
                replicaSet: "atlas-dv4ys4-shard-0"
            }
        ],
        staging: [
            {   
                host: "franklin-shard-00-01.wi9bk.mongodb.net",
                port: "27017",
                database: "prograd_recruit_dev",
                username: "prograd_recruit_dev_user",
                password: "e4SzQtaUlzwsIvJl",
                host_1: "franklin-shard-00-00.wi9bk.mongodb.net",
                port_1: "27017",
                host_2: "franklin-shard-00-02.wi9bk.mongodb.net",
                port_2: "27017",
                replicaSet: "atlas-dv4ys4-shard-0"
            },
            {
                host: "franklin-shard-00-01.wi9bk.mongodb.net",
                port: "27017",
                database: "quizr_platform",
                username: "psr_quizr_user",
                password: "W8p7OnNRSLy6MFvn",
                host_1: "franklin-shard-00-00.wi9bk.mongodb.net",
                port_1: "27017",
                host_2: "franklin-shard-00-02.wi9bk.mongodb.net",
                port_2: "27017",
                replicaSet: "atlas-dv4ys4-shard-0"
            },
            {   
                host: "franklin-shard-00-01.wi9bk.mongodb.net",
                port: "27017",
                database: "quizr",
                username: "psr_quizr_user",
                password: "W8p7OnNRSLy6MFvn",
                host_1: "franklin-shard-00-00.wi9bk.mongodb.net",
                port_1: "27017",
                host_2: "franklin-shard-00-02.wi9bk.mongodb.net",
                port_2: "27017",
                replicaSet: "atlas-dv4ys4-shard-0"
            }
        ],
        prod: [
            {   
                host: "franklin-shard-00-01.wi9bk.mongodb.net",
                port: "27017",
                database: "prograd_recruit",
                username: "prograd_recruit_user",
                password: "ctBGJDJCqkq3r5rc",
                host_1: "franklin-shard-00-00.wi9bk.mongodb.net",
                port_1: "27017",
                host_2: "franklin-shard-00-02.wi9bk.mongodb.net",
                port_2: "27017",
                replicaSet: "atlas-dv4ys4-shard-0"
            },
            {
                host: "franklin-shard-00-00.wi9bk.mongodb.net",
                port: "27017",
                database: "prograd_sr",
                username: "prograd_sr_user",
                password: "7MhRsl3wg8olMxSL",
                host_1: "franklin-shard-00-01.wi9bk.mongodb.net",
                port_1: "27017",
                host_2: "franklin-shard-00-02.wi9bk.mongodb.net",
                port_2: "27017",
                replicaSet: "atlas-dv4ys4-shard-0",
            },
            {
                host: "franklin-shard-00-01.wi9bk.mongodb.net",
                port: "27017",
                database: "quizr_platform",
                username: "psr_quizr_user",
                password: "W8p7OnNRSLy6MFvn",
                host_1: "franklin-shard-00-00.wi9bk.mongodb.net",
                port_1: "27017",
                host_2: "franklin-shard-00-02.wi9bk.mongodb.net",
                port_2: "27017",
                replicaSet: "atlas-dv4ys4-shard-0"
            },
            {   
                host: "franklin-shard-00-01.wi9bk.mongodb.net",
                port: "27017",
                database: "quizr",
                username: "psr_quizr_user",
                password: "W8p7OnNRSLy6MFvn",
                host_1: "franklin-shard-00-00.wi9bk.mongodb.net",
                port_1: "27017",
                host_2: "franklin-shard-00-02.wi9bk.mongodb.net",
                port_2: "27017",
                replicaSet: "atlas-dv4ys4-shard-0"
            }
        ]
    },
    jwt: {
        secret: "KMZENON",
        prograd_secret: "PSAPP"
    },
    encryptKey: "SBFWCA",
    mandrillKey: "DlTvyspn1JA7olUnIA_V6g",
    superCollection: {
        dev: "O_1",
        staging: "O_1",
        prod: "O_1"
    },
    secret_key: "070d67a5d6095b2982595ff50cc29456",
    textLocal: {
        local: {
            apiKey: "wOr4t/DnKA0-szuLWqO5QUJ3KbCOO9KcF3CvBWGE2g"
        },
        dev: {
            apiKey: "wOr4t/DnKA0-szuLWqO5QUJ3KbCOO9KcF3CvBWGE2g"
        },
        staging: {
            apiKey: "wOr4t/DnKA0-szuLWqO5QUJ3KbCOO9KcF3CvBWGE2g"
        },
        prod: {
            apiKey: "wOr4t/DnKA0-szuLWqO5QUJ3KbCOO9KcF3CvBWGE2g"
        }
    },
}