---
language:
- en
license: apache-2.0
task_categories:
- text2text-generation
pretty_name: EvalPlus
tags:
- code-generation
dataset_info:
  features:
  - name: task_id
    dtype: string
  - name: prompt
    dtype: string
  - name: canonical_solution
    dtype: string
  - name: entry_point
    dtype: string
  - name: test
    dtype: string
  splits:
  - name: test
    num_bytes: 10962161
    num_examples: 164
  download_size: 2902210
  dataset_size: 10962161
configs:
- config_name: default
  data_files:
  - split: test
    path: data/test-*
---
