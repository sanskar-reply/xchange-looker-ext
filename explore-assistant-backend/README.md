# Explore Assistant Backend

## Overview

This Terraform configuration establishes a backend for the Looker Explore Assistant on Google Cloud Platform (GCP), facilitating interaction with the Gemini Pro model of Vertex AI. The setup supports two options: a Cloud Function backend and a BigQuery backend, each acting as a proxy/relay for running content through the model.

The Explore Assistant also uses a set of examples to improve the quality of its answers. We store those examples in BigQuery. Please see the comparisons below when deciding which deployment approach to use.

### What backend should I use?

Here we list the reasons and tradeoffs of each deployment approach in an effort to scope the right backend deployment approach based on individual preferences and existing setups. 

**Regardless of Backend**:
* Any Looker database connection can be used for fetching the actual data returned from the natural language query url
* They implement the same API, as in no Looker Credentials are stored in the backends and the arguments are the same (*ie. model parameters and a prompt*)
* By default both approaches fetch examples from a BigQuery table out of simplicity. For Cloud Functions you can modify [this React Hook](../explore-assistant-extension/src/hooks/useExampleData.ts) and change the `connection_name` on line 18 to point to the non BQ database connection in Looker that houses your example prompts/training data.

**For Cloud Function/Run**:
* Generally speaking, this approach is recommended for folks who want more development control on the backend
* Your programming language of choice can be used
* Workflows for custom codeflow like using custom models, combining models to improve results, fetching from external datastores, etc. are supported
* An HTTPS endpoint will be made available that can be leveraged external to Looker (*ie. external applications with a custom web app*)
* The endpoint needs to be public for Looker to reach it (*To Note: the repo implements a signature on the request for security. Otherwise putting the endpoint behind a Load Balancer or API Proxy is recommended. Keep in mind that Looker Extensions however, when not embedded are only accessible by authenticated Looker users.*)

**For BigQuery**:
* Generally speaking, this approach will be easier for users already familiar with Looker
* Invoking the LLM with custom prompts is all done through SQL.
* BigQuery's Service Account or User Oauth Authentication can be used
* BigQuery however will serve as a pass through to the Vertex API
* Looker & BigQuery query limits will apply to this approach 

## Prerequisites

- Terraform installed on your machine.
- Access to a GCP account with permission to create and manage resources.
- A GCP project where the resources will be deployed.

## Configuration and Deployment

### Cloud Function Backend

First create a file that will contain the LOOKER_AUTH_TOKEN and place it at the root. This will be used by the cloud function locally, as well as the extension framework app. The value of this token will uploaded to the GCP project as secret to be used by the Cloud Function.

If in the `/explore-assistant-backend` cd back to root (ie. `cd ..`) and run the following command:
```bash
openssl rand -base64 32 > .vertex_cf_auth_token

```

From the `/explore-assistant-backend` directory run the following.

To deploy the Cloud Function backend:

```bash
cd terraform 
export TF_VAR_project_id=XXX
export TF_VAR_use_bigquery_backend=0
export TF_VAR_use_cloud_function_backend=1
export TF_VAR_looker_auth_token=$(cat ../../.vertex_cf_auth_token)
terraform init
terraform plan
terraform apply
```

### BigQuery Backend

To deploy the BigQuery backend:

```bash
cd terraform 
export TF_VAR_project_id=XXX
export TF_VAR_use_bigquery_backend=1
export TF_VAR_use_cloud_function_backend=0
terraform plan
terraform apply
```

## Deployment Notes

- Changes to the code in `explore-assistant-cloud-function` will result in a zip file with a new hash. This hash is added to the environment variables for the cloud function, and a new hash will trigger the redeployment of the cloud function.

## Resources Created

- Google Cloud Functions or Cloud Run services, based on the selected backend.
- Google BigQuery dataset and table to store the examples
- Google BigQuery connection and gemini pro model, if using the BigQuery backend.
- Necessary IAM roles and permissions for the Looker Explore Assistant to operate.
- Storage buckets for deploying cloud functions or storing data.
- Artifact Registry for storing Docker images, if required.

## Cleaning Up

To remove all resources created by this Terraform configuration, run:

```sh
terraform destroy
```

**Note:** This will delete all resources and data. Ensure you have backups if needed.

## Support

For issues, questions, or contributions, please open an issue in the GitHub repository where this configuration is hosted.
